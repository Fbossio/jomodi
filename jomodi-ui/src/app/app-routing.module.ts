import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { EmptyCartComponent } from './pages/empty-cart/empty-cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  {path: 'login', component: LoginComponent},
  { path: 'product/:id', component: ProductDetailsComponent },
  {path: 'cart', component: CartPageComponent},
  { path: 'empty-cart', component: EmptyCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
