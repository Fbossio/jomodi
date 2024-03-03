import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../core/models/category.interface';
import { createCategory, loadCategories, setCurrentCategory } from '../../state/actions/category.actions';
import { AppState } from '../../state/app.state';
import { selectCategoryList } from '../../state/selectors/category.selector';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent {

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    ) {}

  categories$: Observable<Category[]> = new Observable<Category[]>();
  form!: FormGroup;

  ngOnInit() {
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.select(selectCategoryList);
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required])]
  });
  }

  createCategory(category: any) {
    this.store.dispatch(createCategory({ category }));
    this.form.reset({
      name: ''
    }, {
      onlySelf: false,
      emitEvent: false
    });

  }

  editCategory(category: Category) {
    this.store.dispatch(setCurrentCategory({ category }));
    this.router.navigate([`/admin/edit-category/${category.id}`]);
  }
}
