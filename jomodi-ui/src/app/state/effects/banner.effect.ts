import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { BannerService } from '../../services/banner.service';
import { alert } from '../../utils/alert';
import {
  createBanner,
  createBannerFailure,
  createBannerSuccess,
  deleteBanner,
  deleteBannerFailure,
  deleteBannerSuccess,
  loadBanners,
  loadBannersFailure,
  loadBannersSuccess,
  updateBanner,
  updateBannerFailure,
  updateBannerSuccess
} from '../actions/banner.actions';

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

  updateBanner$ = createEffect(() => this.actions$.pipe(
    ofType(updateBanner),
    exhaustMap(({ id, data }) => this.bannerService.updateBannerData(id, data, this.authService.getHeaders())
      .pipe(
        map(banner => {
          alert('Success', 'Banner updated successfully', 'success')
          return updateBannerSuccess({ banner })
        }),
        catchError(error => {
          alert('Error', 'Error updating banner', 'error')
          return of(updateBannerFailure({ error }))
        }
        )
      ))

    )
  )

  deleteBanner$ = createEffect(() => this.actions$.pipe(
    ofType(deleteBanner),
    exhaustMap(({ id }) => this.bannerService.deleteBannerData(id, this.authService.getHeaders())
      .pipe(
        map(() => {
          alert('Success', 'Banner deleted successfully', 'success')
          return deleteBannerSuccess({ id })
        }),
        catchError(error => {
          alert('Error', 'Error deleting banner', 'error')
          return of(deleteBannerFailure({ error }))
        }
        )
      ))

    )
  )

  createBanner$ = createEffect(() => this.actions$.pipe(
    ofType(createBanner),
    exhaustMap(({ data }) => this.bannerService.createBanner(data, this.authService.getHeaders())
      .pipe(
        map(banner => {
          alert('Success', 'Banner created successfully', 'success')
          return createBannerSuccess({ banner })
        }),
        catchError(error => {
          alert('Error', 'Error creating banner', 'error')
          return of(createBannerFailure({ error }))
        }
        )
      ))

    )
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private bannerService: BannerService
  ) {}

}
