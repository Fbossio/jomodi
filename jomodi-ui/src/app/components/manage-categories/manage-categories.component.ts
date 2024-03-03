import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../core/models/category.interface';
import { loadCategories } from '../../state/actions/category.actions';
import { AppState } from '../../state/app.state';
import { selectCategoryList } from '../../state/selectors/category.selector';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent {

  constructor(private store: Store<AppState>, private fb: FormBuilder,) {}

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
    console.log(category);
  }
}
