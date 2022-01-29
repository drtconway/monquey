import { Category } from "./categories";

export interface MatchingRule {
    regex: string,
    payee: string,
    category: Category,
};