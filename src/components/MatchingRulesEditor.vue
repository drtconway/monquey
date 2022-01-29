<template>
  <v-card>
    <v-card-title>Transaction Matching Rules</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="8" sm="4" md="3"> </v-col>
        <v-col cols="8" sm="4" md="3"> </v-col>
        <v-col cols="8" sm="4" md="3"> </v-col>
        <v-col cols="1" sm="1" md="1">
          <v-btn @click="addRule" x-small><v-icon>mdi-plus</v-icon></v-btn>
        </v-col>
      </v-row>
      <draggable v-model="rules">
        <v-row v-for="(rule, idx) in rules" v-bind:key="idx">
          <v-col cols="8" sm="4" md="3">
            <v-text-field
              v-model="rule.regex"
              label="Matching Expression"
              prepend-icon="mdi-drag-vertical"
              :rules="[validators.regex]"
              validate-on-blur
            >
            </v-text-field>
          </v-col>
          <v-col cols="8" sm="4" md="3">
            <v-text-field v-model="rule.payee" label="Payee Expression">
            </v-text-field>
          </v-col>
          <v-col cols="8" sm="4" md="3">
            <v-combobox
              v-model="rule.category"
              label="Default Category"
              :items="categories"
            >
            </v-combobox>
          </v-col>
          <v-col cols="1" sm="1" md="1">
            <v-btn @click="delRule(idx)" x-small
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </draggable>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field v-model="testString" label="Test String"></v-text-field>
        </v-col>
        <v-col cols="8" sm="4" md="3">
          <v-text-field
            v-model="testPayee"
            readonly
            label="Result Payee"
          ></v-text-field>
        </v-col>
        <v-col cols="8" sm="4" md="3">
          <v-text-field
            v-model="testCategory"
            readonly
            label="Result Category"
          ></v-text-field>
        </v-col>
        <v-col cols="1" sm="1" md="1">
          <v-btn @click="testRules" x-small
            ><v-icon>mdi-test-tube</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
      <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from "vuedraggable";
import { Category } from '../lib/categories';
import { MatchingRule } from '../lib/matching';

@Component({
  components: {
    draggable
  }
})
export default class MatchingRulesEditor extends Vue {
  @Prop() readonly original! : MatchingRule[];
  @Prop({required: true}) readonly categories! : Category[];

  rules: MatchingRule[] = [...this.original];

  testString: string = "Acme Supermarket Coburg-West VISA 00112233****8899";

  testPayee: string = "";

  testCategory: Category = [];

  validators : {[label: string]: (value: string) => (boolean | string)} = {
    regex: (value) => {
      try {
        new RegExp(value);
        return true;
      }
      catch (err) {
        return "not a valid regular expression";
      }
    }
  }

  addRule() {
    this.rules.push({
      regex: "Acme Supermarket ([^ ]*).*",
      payee: "Acme Supermarket $1",
      category: [],
    });
  }

  delRule(idx : number) {
    this.rules.splice(idx, 1);
  }

  testRule(idx : number) {
    console.log(`testRule(${idx})`);
  }

  testRules() {
    let resPayee : string = "";
    let resCategory : Category = [];
    for (let rule of this.rules) {
      let re = new RegExp(rule.regex);
      if (re.exec(this.testString)) {
        resPayee = this.testString.replace(re, rule.payee);
        resCategory = rule.category;
        break;
      }
    }
    this.testPayee = resPayee;
    this.testCategory = resCategory;
  }

  save() {
    this.$emit("save", this.rules);
  }

  close() {
    this.$emit("close");
  }
};
</script>
