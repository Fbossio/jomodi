import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Banner } from '../../core/models/banner.interface';
import { loadBanners, setCurrentBanner } from '../../state/actions/banner.actions';
import { AppState } from '../../state/app.state';
import { selectBannerList } from '../../state/selectors/banner.selector';

@Component({
  selector: 'app-manage-banner',
  templateUrl: './manage-banner.component.html',
  styleUrls: ['./manage-banner.component.css']
})
export class ManageBannerComponent {

  banners$: Observable<any> = new Observable<any>();

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.banners$ = this.store.select(selectBannerList);
    if (!this.banners$) {
      this.store.dispatch(loadBanners())
    }

  }

  edit(banner: Banner) {
    this.store.dispatch(setCurrentBanner({ banner }));
    this.router.navigate([`/admin/edit-banner/${banner.id}`]);
  }

}
