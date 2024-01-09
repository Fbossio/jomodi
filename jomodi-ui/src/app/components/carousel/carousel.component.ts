import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBanners } from '../../state/actions/banner.actions';
import { AppState } from '../../state/app.state';
import { selectBannerList } from '../../state/selectors/banner.selector';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {


  slides$: Observable<any> = new Observable();

  constructor(
    private store: Store<AppState>,
    ) { }

  ngOnInit(): void {
    this.store.dispatch(loadBanners())
    this.slides$ = this.store.select(selectBannerList)
  }



}
