import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@magloft/material-carousel';
import { CarouselModule } from '@marcreichel/angular-carousel';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ProductInfoDisplayComponent } from './components/product-info-display/product-info-display.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { MaterialModule } from './material/material.module';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ROOT_REDUCERS } from './state/app.state';
import { BannerEffect } from './state/effects/banner.effect';
import { ItemsEffect } from './state/effects/items.effect';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { EmptyCartComponent } from './pages/empty-cart/empty-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CarouselComponent,
    ProductItemComponent,
    ShowcaseComponent,
    PaginatorComponent,
    ProductInfoDisplayComponent,
    CartPageComponent,
    CartTableComponent,
    EmptyCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    CarouselModule,
    FormsModule,
    MatCarouselModule.forRoot(),
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([ItemsEffect, BannerEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
