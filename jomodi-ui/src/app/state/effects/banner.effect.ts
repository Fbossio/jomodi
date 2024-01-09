import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { BannerService } from '../../services/banner.service';
import { loadBanners, loadBannersFailure, loadBannersSuccess } from '../actions/banner.actions';

@Injectable()
export class BannerEffect {

  loadBanner$ = createEffect(() => this.actions$.pipe(
    ofType(loadBanners),
    exhaustMap(() => this.bannerService.getBannerData()
      .pipe(
        map(banners => loadBannersSuccess({ banners })),
        catchError(error => of(loadBannersFailure({ error }))
        )
      ))

    )
  )

  constructor(
    private actions$: Actions,
    private bannerService: BannerService
  ) {}

}
