import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@magloft/material-carousel';
import { CarouselModule } from '@marcreichel/angular-carousel';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ProductInfoDisplayComponent } from './components/product-info-display/product-info-display.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { MaterialModule } from './material/material.module';
import { AdminComponent } from './pages/admin/admin.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { EmptyCartComponent } from './pages/empty-cart/empty-cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ROOT_REDUCERS } from './state/app.state';
import { BannerEffect } from './state/effects/banner.effect';
import { ItemsEffect } from './state/effects/items.effect';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { DefaultAddressDisplayComponent } from './components/default-address-display/default-address-display.component';

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
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    CartFormComponent,
    DefaultAddressDisplayComponent,
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
    ReactiveFormsModule,
    MatCarouselModule.forRoot(),
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([ItemsEffect, BannerEffect]),
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
