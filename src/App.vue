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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AccountView from "./components/AccountView.vue";
import MatchingRulesEditor from './components/MatchingRulesEditor.vue';
import TransactionEditor from "./components/TransactionEditor.vue";
import { Category, categoryList, defaultExpenditureCategories } from './lib/categories';
import { makeTransaction, SimpleTransaction, Transaction } from './lib/transaction';

@Component({
  components: {
    AccountView,
    TransactionEditor,
    MatchingRulesEditor
  }
})
export default class App extends Vue {

  cats : Category[] = [...categoryList([], defaultExpenditureCategories)];

  tx : Transaction = makeTransaction();

  rules: MatchingRulesEditor[] = [];

};
</script>
