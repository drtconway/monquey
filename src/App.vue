<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <matching-rules-editor :original="rules" :categories="cats"></matching-rules-editor>
      <TransactionEditor v-if="false" :original="tx" :categories="cats"></TransactionEditor>
      <AccountView v-if="false" acctName="bank account" :categories="cats" />
    </v-main>
  </v-app>
</template>

<script>
import AccountView from "./components/AccountView";
import MatchingRulesEditor from './components/MatchingRulesEditor';
import TransactionEditor from "./components/TransactionEditor";

export default {
  name: "App",

  components: {
    AccountView,
    TransactionEditor,
    MatchingRulesEditor,
  },

  data: () => ({
    tx0: {
      kind: "single",
      date: "2020-12-21",
      payee: "Dan Murphy's",
      category: "Everyday Expenses:Alcohol",
      outgoing: 259.49,
      incoming: 0,
    },
    tx: {
      kind: "split",
      date: "2020-12-21",
      payee: "Dan Murphy's",
      splits: [
        { category: "Everyday Expenses:Alcohol", outgoing: 159.49, incoming: 0 },
        { category: "Rainy Day Funds:Christmas", outgoing: 100.0, incoming: 0 }
      ],
      outgoing: 259.49,
      incoming: 0,
    },
    rules: [],
    cats: [
      "Everyday Expenses:Alcohol",
      "Everyday Expenses:Banking",
      "Everyday Expenses:Bike Maintanence",
      "Everyday Expenses:Car Power",
      "Everyday Expenses:Clothing",
      "Everyday Expenses:Dining Out",
      "Everyday Expenses:Entertainment",
      "Everyday Expenses:Gaming Subscriptions",
      "Everyday Expenses:Groceries",
      "Everyday Expenses:Hobbies",
      "Everyday Expenses:Household Goods",
      "Everyday Expenses:Kid Expenses",
      "Everyday Expenses:Medical",
      "Everyday Expenses:Property Maintenance",
      "Everyday Expenses:Restaurants",
      "Everyday Expenses:School Expenses",
      "Everyday Expenses:Subscriptions",
      "Everyday Expenses:Takeaway",
      "Everyday Expenses:Work Expenses",
      "Everyday Expenses:Work Lunches",
      "Income:Available next month",
      "Income:Available this month",
      "Monthly Bills:Electricity",
      "Monthly Bills:Gas",
      "Monthly Bills:Internet",
      "Monthly Bills:Phone",
      "Monthly Bills:Rates",
      "Monthly Bills:Rent/Mortgage",
      "Monthly Bills:Streaming Media",
      "Monthly Bills:Water",
      "Rainy Day Funds:Birthdays",
      "Rainy Day Funds:Car Insurance",
      "Rainy Day Funds:Car Repairs",
      "Rainy Day Funds:Christmas",
      "Rainy Day Funds:Health Insurance",
      "Rainy Day Funds:Public Transport",
      "Savings Goals:Car Replacement",
      "Savings Goals:Vacation",
    ],
    //
  }),
};
</script>
