<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Edit Transaction</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="4" sm="1" md="2">
            <v-dialog v-model="dateDialog" max-width="300px">
              <v-card>
                <v-date-picker
                  v-model="tx.date"
                  label="Date"
                  show-adjacent-months
                  :show-current="true"
                >
                </v-date-picker>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dateDialog = false"
                  >
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
              <v-icon v-if="balanced" raised color="green">mdi-check</v-icon>
              <v-icon v-else raised color="red">mdi-close</v-icon>
            </v-col>
          </v-row>
        </template>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
      <v-btn color="blue darken-1" text @click="save" :disabled="!balanced">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TransactionEditor",
  props: {
    original: Object,
    categories: Array,
  },
  computed: {
    mycat: {
      get() {
        console.log(this.tx.kind);
        return this.tx.kind == "split" ? " split " : this.tx.category;
      },
      set(cat) {
        if (cat == " split ") {
          this.tx.kind = "split";
          this.tx.splits = this.splits;
          delete this.tx.category;
        } else {
          this.tx.kind = "single";
          this.tx.category = cat;
          this.splits = this.tx.splits;
          delete this.tx.splits;
        }
      },
    },
    catlist() {
      return [" split "].concat(this.categories);
    },

    balanced() {
      if (this.tx.kind == "single") {
        return true;
      }
      let sum = 0;
      for (let i = 0; i < this.tx.splits.length; ++i) {
        let spl = this.tx.splits[i];
        sum += spl.incoming - spl.outgoing;
      }
      console.log(sum);
      return this.tx.incoming - this.tx.outgoing - sum == 0;
    },
  },
  data() {
    return {
      splitHeaders: [
        { text: "Category", value: "category" },
        { text: "Outgoing", value: "outgoing" },
        { text: "Incoming", value: "incoming" },
      ],
      tx: {...this.original},
      split: this.original.kind == "split" ? this.original.splits : [],
      dateDialog: false,
    };
  },
  methods: {
    save() {
      console.log(JSON.stringify(this.tx));
      this.$emit("save", this.tx);
    },

    close() {
      this.$emit("close");
    },

    addSplit() {
      this.tx.splits.push({ category: "", outgoing: 0, incoming: 0 });
    },

    delSplit(idx) {
      console.log(`request to delete ${idx}`);
      this.tx.splits.splice(idx, 1);
    },
  },
};
</script>
