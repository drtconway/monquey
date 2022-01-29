<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Edit Transaction</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="4" sm="1" md="2">
            <v-dialog v-model="dateDialog" max-width="290px">
              <v-card>
                <v-date-picker
                  v-model="tx.date"
                  label="Date"
                  show-adjacent-months
                  no-title
                  :show-current="true"
                >
                </v-date-picker>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dateDialog = false">
                    Ok
                  </v-btn>
                </v-card-actions>
              </v-card>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="tx.date"
                  label="Date"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
            </v-dialog>
          </v-col>
          <v-col cols="6" sm="3" md="2">
            <v-text-field v-model="tx.payee" label="Payee"></v-text-field>
          </v-col>
          <v-col cols="8" sm="4" md="3">
            <v-combobox
              v-model="mycat"
              label="Category"
              :items="catlist"
            ></v-combobox>
          </v-col>
          <v-col cols="4" sm="1" md="2">
            <v-text-field v-model="tx.outgoing" label="Outgoing"></v-text-field>
          </v-col>
          <v-col cols="4" sm="1" md="2">
            <v-text-field v-model="tx.incoming" label="Incoming"></v-text-field>
          </v-col>
        </v-row>
        <template v-if="tx.kind == 'split'">
          <v-row v-for="(spl, idx) in tx.splits" v-bind:key="idx">
            <v-col cols="4" sm="1" md="2"> </v-col>
            <v-col cols="6" sm="3" md="2"> </v-col>
            <v-col cols="8" sm="4" md="3">
              <v-combobox
                v-model="spl.category"
                label="Category"
                :items="catlist"
              ></v-combobox>
            </v-col>
            <v-col cols="4" sm="1" md="2">
              <v-text-field
                v-model="spl.outgoing"
                label="Outgoing"
              ></v-text-field>
            </v-col>
            <v-col cols="4" sm="1" md="2">
              <v-text-field
                v-model="spl.incoming"
                label="Incoming"
              ></v-text-field>
            </v-col>
            <v-col cols="1" sm="1" md="1">
              <v-btn @click="delSplit(idx)" x-small
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" sm="1" md="2"> </v-col>
            <v-col cols="6" sm="3" md="2"> </v-col>
            <v-col cols="8" sm="4" md="3"> </v-col>
            <v-col cols="4" sm="1" md="2"> </v-col>
            <v-col cols="1" sm="1" md="1">
              <v-btn @click="addSplit" x-small><v-icon>mdi-plus</v-icon></v-btn>
            </v-col>
            <v-col cols="1" sm="1" md="1">
              <v-icon v-if="balance == 0" raised color="green"
                >mdi-check</v-icon
              >
              <template v-else>
                <v-icon raised color="red">mdi-close</v-icon>
                {{
                  Intl.NumberFormat("en-AU", {
                    style: "currency",
                    currency: "AUD",
                  }).format(balance)
                }}
              </template>
            </v-col>
          </v-row>
        </template>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
      <v-btn color="blue darken-1" text @click="save" :disabled="balance != 0">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Category, CategoryIndex, makeCategoryIndex } from '../lib/categories';
import { SimpleTransaction, SplitTransaction, Transaction, TransactionSplit } from '../lib/transaction';

@Component
export default class TransactionEditor extends Vue {
  @Prop({required: true}) readonly original! : Transaction;
  @Prop({required: true}) readonly categories! : Category[];

  readonly splitHeaders : {text: string, value: string}[] =  [
        { text: "Category", value: "category" },
        { text: "Outgoing", value: "outgoing" },
        { text: "Incoming", value: "incoming" },
      ];

  readonly categoryIndex : CategoryIndex = makeCategoryIndex(this.categories);

  tx : Transaction = {...this.original};

  splits : TransactionSplit[] = [];

  dateDialogue : boolean = false;

  get mycat() : string {
    return this.tx.split == true ? "Split " : this.tx.category.join(' : ');
  };

  set mycat(cat) {
    if (cat == "Split ") {
      this.tx.split = true;
      this.tx.splits = [...this.splits];
       delete this.tx.category;
    } else {
      this.tx.split = false;
      this.tx.category = this.categoryIndex[cat];
      this.splits = [...(this.tx.splits || [])];
      delete this.tx.splits;
    }
  };

    get catlist() : Category[] {
      return [["Split "]].concat(this.categories);
    };

    get balance() {
      if (this.tx.split == false) {
        return true;
      }
      let sum = 0;
      for (let i = 0; i < this.tx.splits.length; ++i) {
        let spl = this.tx.splits[i];
        sum += spl.incoming - spl.outgoing;
      }
      return this.tx.incoming - this.tx.outgoing - sum;
    }

    save() {
      this.$emit("save", this.tx);
    }

    close() {
      this.$emit("close");
    }

    addSplit() {
      if (this.tx.split == false) {
        throw new Error(`addSplit invoked on non-split transaction.`)
      }
      let spl : TransactionSplit = { category: [], outgoing: 0, incoming: 0, note: "" };
      this.tx.splits.push(spl);
    }

    delSplit(idx : number) {
      if (this.tx.split == false) {
        throw new Error(`delSplit invoked on non-split transaction.`)
      }
      this.tx.splits.splice(idx, 1);
    }
};
</script>
