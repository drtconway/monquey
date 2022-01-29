export type Category = string[];

export type CategoryTree = { [name: string]: CategoryTree };

export type CategoryIndex = { [label: string]: Category };

export function addCategory(node: CategoryTree, category: Category): void {
  for (let cat of category) {
    if (!(cat in node)) {
      node[cat] = {};
    }
    node = node[cat];
  }
}

export function* categoryList(
  parent: Category,
  node: CategoryTree
): Generator<Category> {
  for (let sub in node) {
    let self = [...parent].concat([sub]);
    yield self;
    let kids = categoryList(self, node[sub]);
    while (true) {
      let { done, value } = kids.next();
      if (done) {
        break;
      }
      yield value;
    }
  }
}

export function makeCategoryIndex(categories : Category[]) : CategoryIndex {
    let idx : CategoryIndex = {};
    for (let category of categories) {
        let label = category.join(': ');
        idx[label] = category;
    }
    return idx;
}

export const defaultIncomeCategories : CategoryTree = {
    Income: {
        "Your take-home pay": {},
        "Your partner's take-home pay": {},
        "Bonuses / overtime": {},
        "Income from savings and investments": {},
        "Government benefits": {},
        "Child support received": {},
        "Other": {}
    
    }
};

export const defaultExpenditureCategories : CategoryTree = {
  "Home & utilities": {
    "Mortgage & rent": {},
    "Body corporate fees": {},
    "Council rates": {},
    "Furniture & appliances": {},
    "Renovations & maintenance": {},
    Electricity: {},
    Gas: {},
    Water: {},
    Internet: {},
    "Pay TV": {},
    "Home phone": {},
    Mobile: {},
    Other: {},
  },

  "Insurance & financial": {
    "Car insurance": {},
    "Home & contents insurance": {},
    "Personal & life insurance": {},
    "Health insurance": {},
    "Car loan": {},
    "Credit card interest": {},
    "Other loans": {},
    "Paying off debt": {},
    Savings: {},
    "Investments & super contributions": {},
    "Charity donations": {},
    Other: {},
  },

  Groceries: {
    Supermarket: {},
    Butcher: {},
    "Fruit & veg market": {},
    "Fish shop": {},
    "Deli & bakery": {},
    "Pet food": {},
    Other: {},
  },

  "Personal & medical": {
    "Cosmetics & toiletries": {},
    "Hair & beauty": {},
    "Medicines & pharmacy": {},
    "Glasses & eye care": {},
    Dental: {},
    "Doctors & medical": {},
    Hobbies: {},
    "Clothing & shoes": {},
    "Jewellery & accessories": {},
    "Computers & gadgets": {},
    "Sports & gym": {},
    Education: {},
    "Pet care & vet": {},
    Other: {},
  },

  "Entertainment & eating-out": {
    "Coffee & tea": {},
    "Lunches bought": {},
    "Take-away & snacks": {},
    Cigarettes: {},
    "Drinks & alcohol": {},
    "Bars & clubs": {},
    Restaurants: {},
    Books: {},
    "Newspapers & magazines": {},
    "Movies & music": {},
    Holidays: {},
    "Celebrations & gifts": {},
    Other: {},
  },

  "Transport & auto": {
    "Bus & train & ferry": {},
    Petrol: {},
    "Road tolls & parking": {},
    "Rego & licence": {},
    "Repairs & maintenance": {},
    Fines: {},
    Airfares: {},
    Other: {},
  },

  Children: {
    "Baby products": {},
    Toys: {},
    Babysitting: {},
    Childcare: {},
    "Sports & activities": {},
    "School fees": {},
    Excursions: {},
    "School uniforms": {},
    "Other school needs": {},
    "Child support payment": {},
    Other: {},
  },
};
