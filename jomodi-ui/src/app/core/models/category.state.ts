import { Category } from "./category.interface";

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  currentCategory: null | Category;
}
