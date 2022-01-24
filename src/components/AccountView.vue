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
        <template v-else> split </template>
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

<script>
import TransactionEditor from "./TransactionEditor";

export default {
  name: "AccountView",

  components: {
    TransactionEditor,
  },

  props: {
    acctName: String,
    categories: Array,
  },

  data() {
    return {
      pageLength: 150,
      colnames: [
        { text: "Date", value: "date", sortable: true },
        { text: "Payee", value: "payee", sortable: true },
        { text: "Category", value: "catbrief", sortable: true },
        { text: "outgoing", value: "outgoing", sortable: true },
        { text: "incoming", value: "incoming", sortable: true },
      ],
      transactions: [
        {
          kind: "single",
          date: "2020-12-21",
          payee: "Dan Murphy's",
          category: "Everyday Expenses:Alcohol",
          outgoing: 259.49,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2020-12-24",
          payee: "Wages",
          category: "Wages",
          outgoing: 0,
          incoming: 86,
        },
        {
          kind: "single",
          date: "2020-12-25",
          payee: "Woolworths",
          category: "Everyday Expenses:Groceries",
          outgoing: 25.95,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2020-12-27",
          payee: "AAMI",
          category: "Rainy Day Funds:Car Insurance",
          outgoing: 3.92,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-01-01",
          payee: "Sandrock",
          category: "Everyday Expenses:Work Lunches",
          outgoing: 33.4,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-01-03",
          payee: "Disney Plus",
          category: "Monthly Bills:Streaming Media",
          outgoing: 11.36,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-01-04",
          payee: "Pure Poultry",
          category: "Everyday Expenses:Groceries",
          outgoing: 2.33,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-01-08",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 49.64,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-01-10",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 10.29,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-01-12",
          payee: "The Guardian",
          category: "Everyday Expenses:Subscriptions",
          outgoing: 106.12,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-01-13",
          payee: "Cafe",
          category: "Savings Goals:Vacation",
          outgoing: 32.01,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-01-20",
          payee: "AHM",
          category: "Rainy Day Funds:Health Insurance",
          outgoing: 12.07,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-01-22",
          payee: "Wine Shop",
          category: "Everyday Expenses:Alcohol",
          outgoing: 60.72,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-01-28",
          payee: "Woolworths",
          category: "Everyday Expenses:Groceries",
          outgoing: 323.21,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-02-01",
          payee: "Wages",
          category: "Wages",
          outgoing: 0,
          incoming: 137,
        },
        {
          kind: "single",
          date: "2021-02-02",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 10.89,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-02-05",
          payee: "Woolworths",
          category: "Everyday Expenses:Groceries",
          outgoing: 76.25,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-02-10",
          payee: "Velo Cycles",
          category: "Everyday Expenses:Bike Maintanence",
          outgoing: 18.11,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-02-19",
          payee: "Terra Madre",
          category: "Everyday Expenses:Groceries",
          outgoing: 34.81,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-03-05",
          payee: "Liquorland",
          category: "Everyday Expenses:Alcohol",
          outgoing: 21.97,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-03-07",
          payee: "Optus",
          category: "Monthly Bills:Internet",
          outgoing: 1.67,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-03-08",
          payee: "Spotlight",
          category: "Everyday Expenses:Hobbies",
          outgoing: 10.73,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-03-11",
          payee: "Officeworks",
          category: "Everyday Expenses:Work Expenses",
          outgoing: 5.78,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-03-12",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 2.65,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-03-13",
          payee: "Wages",
          category: "Wages",
          outgoing: 0,
          incoming: 7,
        },
        {
          kind: "single",
          date: "2021-03-18",
          payee: "Liquorland",
          category: "Everyday Expenses:Alcohol",
          outgoing: 38.38,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-03-19",
          payee: "Wages",
          category: "Wages",
          outgoing: 0,
          incoming: 34,
        },
        {
          kind: "single",
          date: "2021-03-22",
          payee: "AHM",
          category: "Rainy Day Funds:Health Insurance",
          outgoing: 20.34,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-03-24",
          payee: "Optus",
          category: "Monthly Bills:Phone",
          outgoing: 13.13,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-03-26",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 5.32,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-03-29",
          payee: "Gardener",
          category: "Everyday Expenses:Sam's Allowance",
          outgoing: 58.61,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-03-30",
          payee: "Shuji Sushi ",
          category: "Everyday Expenses:Work Lunches",
          outgoing: 95.7,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-04-02",
          payee: "Shuji Sushi ",
          category: "Everyday Expenses:Work Lunches",
          outgoing: 177.53,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-04-06",
          payee: "Kitchen Warehouse",
          category: "Everyday Expenses:Hobbies",
          outgoing: 89.84,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-04-07",
          payee: "Kogan",
          category: "Everyday Expenses:Hobbies",
          outgoing: 18.13,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-04-11",
          payee: "Coffea",
          category: "Rainy Day Funds:Birthdays",
          outgoing: 32.2,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-04-14",
          payee: "Wages",
          category: "Wages",
          outgoing: 0,
          incoming: 63,
        },
        {
          kind: "single",
          date: "2021-04-16",
          payee: "Woolworths",
          category: "Everyday Expenses:Groceries",
          outgoing: 23.26,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-04-17",
          payee: "Kogan",
          category: "Everyday Expenses:Household Goods",
          outgoing: 13.69,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-04-18",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 61.09,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-04-19",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 8.49,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-04-22",
          payee: "Liquorland",
          category: "Everyday Expenses:Alcohol",
          outgoing: 10.95,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-04-23",
          payee: "Woolworths",
          category: "Everyday Expenses:Groceries",
          outgoing: 24.29,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-04-25",
          payee: "Woolworths",
          category: "Everyday Expenses:Groceries",
          outgoing: 1.67,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-04-26",
          payee: "Wages",
          category: "Wages",
          outgoing: 0,
          incoming: 95,
        },
        {
          kind: "single",
          date: "2021-04-30",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 24.7,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-01",
          payee: "Sandrock",
          category: "Everyday Expenses:Work Lunches",
          outgoing: 16.59,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-03",
          payee: "BWS",
          category: "Everyday Expenses:Alcohol",
          outgoing: 12.82,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-08",
          payee: "Morton's Shoes",
          category: "Everyday Expenses:Kid Expenses",
          outgoing: 8.17,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-09",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 114.71,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-10",
          payee: "Woolworths",
          category: "Everyday Expenses:Groceries",
          outgoing: 6.31,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-11",
          payee: "Powershop",
          category: "Monthly Bills:Electricity",
          outgoing: 33.49,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-12",
          payee: "Woolworths",
          category: "Everyday Expenses:Groceries",
          outgoing: 30,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-13",
          payee: "Dan Murphy's",
          category: "Everyday Expenses:Alcohol",
          outgoing: 60.38,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-16",
          payee: "Biviano Grocer",
          category: "Everyday Expenses:Groceries",
          outgoing: 6.96,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-20",
          payee: "Choice",
          category: "Everyday Expenses:Subscriptions",
          outgoing: 32.51,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-23",
          payee: "Bunnings",
          category: "Everyday Expenses:Household Goods",
          outgoing: 7.91,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-25",
          payee: "BWS",
          category: "Everyday Expenses:Alcohol",
          outgoing: 15.53,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-05-27",
          payee: "Shuji Sushi ",
          category: "Everyday Expenses:Work Lunches",
          outgoing: 8.6,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-06-08",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 20.94,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-06-12",
          payee: "Sandrock",
          category: "Everyday Expenses:Work Lunches",
          outgoing: 33.12,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-06-14",
          payee: "Pure Poultry",
          category: "Everyday Expenses:Groceries",
          outgoing: 34.84,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-06-16",
          payee: "Meatwell",
          category: "Everyday Expenses:Groceries",
          outgoing: 25.55,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-06-21",
          payee: "AHM",
          category: "Rainy Day Funds:Health Insurance",
          outgoing: 17.33,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-06-24",
          payee: "Dan Murphy's",
          category: "Everyday Expenses:Alcohol",
          outgoing: 14.12,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-07-06",
          payee: "Yarra Valley Water",
          category: "Monthly Bills:Water",
          outgoing: 14.28,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-07-08",
          payee: "Woolworths",
          category: "Everyday Expenses:Groceries",
          outgoing: 10.13,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-07-09",
          payee: "Wages",
          category: "Wages",
          outgoing: 0,
          incoming: 39,
        },
        {
          kind: "single",
          date: "2021-07-11",
          payee: "Wages",
          category: "Wages",
          outgoing: 0,
          incoming: 202,
        },
        {
          kind: "single",
          date: "2021-07-23",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 356.58,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-07-30",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 20.97,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-08-02",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 8.96,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-08-03",
          payee: "Wages",
          category: "Wages",
          outgoing: 0,
          incoming: 21,
        },
        {
          kind: "single",
          date: "2021-08-05",
          payee: "ING",
          category: "Everyday Expenses:Banking",
          outgoing: 122.98,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-08-07",
          payee: "Ikea",
          category: "Everyday Expenses:Household Goods",
          outgoing: 68.77,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-08-11",
          payee: "Silvestri Pharmacy",
          category: "Everyday Expenses:Medical",
          outgoing: 37.29,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-08-14",
          payee: "Aldi Mobile",
          category: "Everyday Expenses:Kid - Phone",
          outgoing: 74.34,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-08-15",
          payee: "BWS",
          category: "Everyday Expenses:Alcohol",
          outgoing: 63.95,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-08-17",
          payee: "Gardener",
          category: "Everyday Expenses:Property Maintenance",
          outgoing: 77.3,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-08-24",
          payee: "Blizzard",
          category: "Everyday Expenses:Gaming Subscriptions",
          outgoing: 22.93,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-08-30",
          payee: "Kmart",
          category: "Everyday Expenses:Hobbies",
          outgoing: 6.86,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-09-02",
          payee: "Blizzard",
          category: "Everyday Expenses:Gaming Subscriptions",
          outgoing: 21.48,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-09-10",
          payee: "BWS",
          category: "Everyday Expenses:Alcohol",
          outgoing: 7.37,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-09-16",
          payee: "Northside Clinic",
          category: "Everyday Expenses:Medical",
          outgoing: 8.14,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-09-23",
          payee: "Mate",
          category: "Monthly Bills:Internet",
          outgoing: 10.31,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-09-27",
          payee: "Woolworths",
          category: "Everyday Expenses:Groceries",
          outgoing: 12.49,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-09-28",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 7.51,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-09-30",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 10.96,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-10-02",
          payee: "Velo Cycles",
          category: "Everyday Expenses:Bike Maintanence",
          outgoing: 11.06,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-10-09",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 90.99,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-10-10",
          payee: "Melbourne Food Ingredient Company",
          category: "Everyday Expenses:Groceries",
          outgoing: 78.96,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-10-15",
          payee: "Stomping Ground",
          category: "Everyday Expenses:Dining Out",
          outgoing: 12.99,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-10-23",
          payee: "Connor Clothing",
          category: "Everyday Expenses:Clothing",
          outgoing: 7.77,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-10-28",
          payee: "Woolworths",
          category: "Everyday Expenses:Groceries",
          outgoing: 415.2,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-10-30",
          payee: "Pure Poultry",
          category: "Everyday Expenses:Groceries",
          outgoing: 10.95,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-11-09",
          payee: "Bunnings",
          category: "Everyday Expenses:Household Goods",
          outgoing: 133.95,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-11-13",
          payee: "Wages",
          category: "Wages",
          outgoing: 0,
          incoming: 29,
        },
        {
          kind: "single",
          date: "2021-11-14",
          payee: "Nisbets",
          category: "Everyday Expenses:Hobbies",
          outgoing: 16.58,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-11-17",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 59.47,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-11-21",
          payee: "Aldi",
          category: "Everyday Expenses:Kid Expenses",
          outgoing: 4.98,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-11-27",
          payee: "Gardener",
          category: "Everyday Expenses:Sam's Allowance",
          outgoing: 12.27,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-12-03",
          payee: "Liquorland",
          category: "Everyday Expenses:Alcohol",
          outgoing: 48.72,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-12-15",
          payee: "Coles",
          category: "Everyday Expenses:Groceries",
          outgoing: 52.41,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-12-26",
          payee: "AHM",
          category: "Rainy Day Funds:Health Insurance",
          outgoing: 1.19,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2021-12-29",
          payee: "Dan Murphy's",
          category: "Everyday Expenses:Alcohol",
          outgoing: 20.53,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2022-01-09",
          payee: "Aldi Mobile",
          category: "Everyday Expenses:Kid - Phone",
          outgoing: 10.24,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2022-01-11",
          payee: "House",
          category: "Rainy Day Funds:Christmas",
          outgoing: 6.61,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2022-01-14",
          payee: "Popcultcha",
          category: "Rainy Day Funds:Birthdays",
          outgoing: 3.54,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2022-01-19",
          payee: "Woolworths",
          category: "Everyday Expenses:Groceries",
          outgoing: 27.41,
          incoming: 0,
        },
        {
          kind: "single",
          date: "2022-01-23",
          payee: "Aldi",
          category: "Rainy Day Funds:Christmas",
          outgoing: 8.11,
          incoming: 0,
        },
      ],
      editDialog: false,
      itemToEdit: null,
      itemToEditIndex: null,
    };
  },
  methods: {
    addRow() {
      let idx = this.transactions.length;
      this.itemToEdit = {kind: 'single', date: '', payee: '', category: '', outgoing: 0, incoming: 0};
      this.itemToEditIndex = idx;
      this.editDialog = true;
    },

    editRow(item) {
      let idx = this.transactions.indexOf(item);
      this.itemToEdit = this.transactions[idx];
      this.itemToEditIndex = idx;
      console.log(`idx = ${idx}`);
      this.editDialog = true;
    },

    saveTransaction(item) {
      if (this.itemToEditIndex < this.transactions.length) {
        this.transactions.splice(this.itemToEditIndex, 1, item);
      } else {
          this.transactions.push(item);
      }
      this.editDialog = false;
    },
  },
};
</script>