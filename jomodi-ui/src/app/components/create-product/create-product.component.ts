import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Category } from '../../core/models/category.interface';
import { loadCategories } from '../../state/actions/category.actions';
import { createItem } from '../../state/actions/itmems.actions';
import { AppState } from '../../state/app.state';
import { selectCategoryList } from '../../state/selectors/category.selector';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  private subscription = new Subscription();
  form!: FormGroup;
  categories: Category[] = [];
  fileName: string = 'No file selected';

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      categoryId: [''],
      stock: [0],
      file: [null]
    });
    this.subscription.add(
      this.store.select(selectCategoryList).subscribe(categories => {
        this.categories = categories;
        if (!categories.length) this.store.dispatch(loadCategories());
      })
    );
  }

  createProduct(product: any) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('categoryId', product.categoryId);
    formData.append('stock', product.stock);
    formData.append('file', product.file);
    this.store.dispatch(createItem({ item: formData }));
    console.log(product);
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.form.get('file')!.setValue(fileList[0]);
      this.fileName = fileList[0].name;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
