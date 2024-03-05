import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBanners } from '../../state/actions/banner.actions';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-manage-banner',
  templateUrl: './manage-banner.component.html',
  styleUrls: ['./manage-banner.component.css']
})
export class ManageBannerComponent {

  banners$: Observable<any> = new Observable<any>();

  constructor(private store: Store<AppState>,) {}

  ngOnInit() {
    this.banners$ = this.store.select(state => state.banner.banners);
    if (!this.banners$) {
      this.store.dispatch(loadBanners())
    }

  }

  edit(id: number) {
    console.log('Edit banner with id: ', id)
  }

}
