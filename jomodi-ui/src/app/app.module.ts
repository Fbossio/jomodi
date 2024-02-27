import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStripeModule } from 'ngx-stripe';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@magloft/material-carousel';
import { CarouselModule } from '@marcreichel/angular-carousel';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { DefaultAddressDisplayComponent } from './components/default-address-display/default-address-display.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductInfoDisplayComponent } from './components/product-info-display/product-info-display.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { MaterialModule } from './material/material.module';
import { AdminComponent } from './pages/admin/admin.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { EmptyCartComponent } from './pages/empty-cart/empty-cart.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ROOT_REDUCERS } from './state/app.state';
import { BannerEffect } from './state/effects/banner.effect';
import { ItemsEffect } from './state/effects/items.effect';
import { OrderEffect } from './state/effects/order.effect';
import { PaymentIntentEffect } from './state/effects/paymentIntent.effect';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ManageBannerComponent } from './components/manage-banner/manage-banner.component';
import { CreateBannerComponent } from './components/create-banner/create-banner.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

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
    OrderPageComponent,
    OrderDetailsComponent,
    PaymentComponent,
    ProfilePageComponent,
    ManageProductsComponent,
    CreateProductComponent,
    ManageBannerComponent,
    CreateBannerComponent,
    UpdateProductComponent,
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
    EffectsModule.forRoot([ItemsEffect, BannerEffect, OrderEffect, PaymentIntentEffect]),
    SweetAlert2Module.forRoot(),
    NgxStripeModule.forRoot(environment.stripe.publicKey)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
