import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadItems } from '../../state/actions/itmems.actions';
import { AppState } from '../../state/app.state';
import { selectItemsList } from '../../state/selectors/items.selector';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent {
  loading$: Observable<boolean> = new Observable();

  constructor(
    private store: Store<AppState>,
    ) {}


  items$: Observable<any> = new Observable();


  ngOnInit(): void {
    this.store.dispatch(loadItems())
    this.items$ = this.store.select(selectItemsList);

  }

}
