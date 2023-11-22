export class Category {
  id: number;
  name: string;

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
