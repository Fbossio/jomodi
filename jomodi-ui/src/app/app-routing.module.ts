import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBannerComponent } from './components/create-banner/create-banner.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { LoginComponent } from './components/login/login.component';
import { ManageBannerComponent } from './components/manage-banner/manage-banner.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UpdateBannerComponent } from './components/update-banner/update-banner.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { EmptyCartComponent } from './pages/empty-cart/empty-cart.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: RegisterComponent},
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  { path: 'cart', component: CartPageComponent},
  { path: 'empty-cart', component: EmptyCartComponent },
  { path: 'order/:id', component: OrderPageComponent, canActivate: [AuthGuard]},
  { path: 'payment', component: PaymentComponent },
  { path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'manage-products', component: ManageProductsComponent },
      { path: 'create-product', component: CreateProductComponent },
      { path: 'edit-product/:id', component: UpdateProductComponent},
      { path: 'manage-banner', component: ManageBannerComponent },
      { path: 'edit-banner/:id', component: UpdateBannerComponent },
      { path: 'create-banner', component: CreateBannerComponent },
      { path: 'manage-category', component: ManageCategoriesComponent },
      { path: 'edit-category/:id', component: UpdateCategoryComponent },
    ]
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
