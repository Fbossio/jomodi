import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Category } from '../../core/models/category.interface';
import { deleteCategory, updateCategory } from '../../state/actions/category.actions';
import { AppState } from '../../state/app.state';
import { selectCurrentCategory } from '../../state/selectors/category.selector';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
    ) { }

  private subscriptions = new Subscription();
  category: Category | null = null;
  form!: FormGroup;

  private initForm(): void {
    this.form = this.fb.group({
      name: ['']
    });
  }

  private updateForm(category: Category): void {
    this.form.setValue({
      name: category.name
    });
  }

  ngOnInit() {
    this.initForm();
    this.subscriptions.add(
      this.store.select(selectCurrentCategory).subscribe(category => {
        this.category = category;
        this.updateForm(category as Category);
      })
    );

  }

  onDelete() {
    this.store.dispatch(deleteCategory({ id: this.category!.id }));
    this.router.navigate(['/admin/manage-category']);
  }

  onSubmit() {
    this.store.dispatch(updateCategory({ id: this.category!.id ,category: this.form.value }));
    this.router.navigate(['/admin/manage-category']);
  }
}
