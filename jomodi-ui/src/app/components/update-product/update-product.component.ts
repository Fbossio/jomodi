import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Item } from '../../core/models/item.interface';
import { loadItem, updateItem } from '../../state/actions/itmems.actions';
import { AppState } from '../../state/app.state';
import { selectItem } from '../../state/selectors/item.selector';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    ){}

  private subscriptions = new Subscription();
  product: Item | null = null;
  updateProductForm!: FormGroup;
  fileName: string = 'No file selected';

  ngOnInit() {
    this.initForm();
    this.subscriptions.add(
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.store.dispatch(loadItem({ id: +id }));
          this.subscriptions.add(
            this.store.select(selectItem).subscribe(item => {
              this.product = item;
              this.updateForm(item);
            })
          );
        }
      })
    );
  }

  private initForm(): void {
    this.updateProductForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      categoryId: [''],
      stock: [0],
      file: [null]
    });
  }

  private updateForm(item: Item): void {
    this.updateProductForm.setValue({
      name: item.name,
      description: item.description,
      price: item.price,
      categoryId: item.categoryId,
      stock: item.stock,
      file: null
    });
  }

  onSubmit(): void {
    // const formData: FormData = new FormData();

    // formData.append('file', this.updateProductForm.value.file);
    // formData.append('description', this.updateProductForm.value.description);
    // formData.append('price', this.updateProductForm.value.price.toString());
    // formData.append('categoryId', this.updateProductForm.value.categoryId);
    // formData.append('stock', this.updateProductForm.value.stock.toString());
    // if (this.updateProductForm.value.file) {
    //   formData.append('file', this.updateProductForm.value.file);
    // }


    // console.log('file:', formData.get('file'));
    // console.log('description:', formData.get('description'));
    // console.log('price:', formData.get('price'));
    // console.log('categoryId:', formData.get('categoryId'));
    // console.log('stock:', formData.get('stock'));

    // this.store.dispatch(updateItem({ id: this.product!.id, item: formData }));
    this.store.dispatch(updateItem({ id: this.product!.id, item: this.updateProductForm.value }));
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.updateProductForm.get('file')!.setValue(fileList[0]);
      this.fileName = fileList[0].name;
    }
  }

  onDelete() {
    console.log(`Deleting product with id: ${this.product?.id}`);
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
