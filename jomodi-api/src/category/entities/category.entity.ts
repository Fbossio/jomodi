export class Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
