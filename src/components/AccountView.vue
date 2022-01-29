<template>
  <div>
    <h2>{{ acctName }}</h2>
    <v-btn @click="addRow" x-small><v-icon>mdi-plus</v-icon></v-btn>
    <v-data-table
      dense
      :headers="colnames"
      :items="transactions"
      :items-per-page="pageLength"
      :sort-by="['date']"
      @click:row="editRow"
    >
      <template v-slot:item.catbrief="{ item }">
        <template v-if="item.kind == 'single'">{{ item.category }}</template>
        <template v-else>Split </template>
      </template>
      <template v-slot:top>
        <v-dialog v-model="editDialog">
          <transaction-editor
            :original="itemToEdit"
            :categories="categories"
            @save="saveTransaction"
            @close="editDialog = false"
          />
        </v-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Category } from "../lib/categories";
import { TransactionMaker } from '../lib/helpers';
import { makeTransaction, Transaction } from "../lib/transaction";
import { DataTableHeader } from '../lib/vuetify-types';
import TransactionEditor from "./TransactionEditor.vue";

@Component({
  components: {
    TransactionEditor
  }
})
export default class AccountView extends Vue {
  @Prop({required: true}) acctName! : string;
  @Prop({required: true}) categories! : Category[];

  readonly pageLength: number = 150;
  readonly colnames: DataTableHeader[] = [
        { text: "Date", value: "date", sortable: true },
        { text: "Payee", value: "payee", sortable: true },
        { text: "Category", value: "catbrief", sortable: true },
        { text: "outgoing", value: "outgoing", sortable: true },
        { text: "incoming", value: "incoming", sortable: true },
      ];

  editDialog: boolean = false;
  itemToEdit: Transaction | null = null;
  itemToEditIndex: number = -1;

  transactions : Transaction[] = new TransactionMaker(19).makeLots(200);

  addRow() {
    let idx = this.transactions.length;
    this.itemToEdit = makeTransaction();
    this.itemToEditIndex = idx;
    this.editDialog = true;
  }

  editRow(item : Transaction) {
    let idx = this.transactions.indexOf(item);
    this.itemToEdit = this.transactions[idx];
    this.itemToEditIndex = idx;
    this.editDialog = true;
  }

  saveTransaction(item : Transaction) {
    if (this.itemToEditIndex < this.transactions.length) {
      this.transactions.splice(this.itemToEditIndex, 1, item);
    } else {
      this.transactions.push(item);
    }
    this.editDialog = false;
  }
};
</script>
