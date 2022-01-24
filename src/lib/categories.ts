
export type Category = string[];

export type  CategoryTree = {[name: string]: CategoryTree};

export function addCategory(node: CategoryTree, category: Category) : void {
    for (let cat of category) {
        if (!(cat in node)) {
            node[cat] = {};
        }
        node = node[cat];
    }
}

export function* categoryList(parent: Category, node: CategoryTree) : Generator<Category> {
    for (let sub in node) {
        let self = [...parent].concat([sub]);
        yield self;
        let kids = categoryList(self, node[sub]);
        while (true) {
            let {done, value} = kids.next();
            if (done) {
                break;
            }
            yield value;
        }
    }
}