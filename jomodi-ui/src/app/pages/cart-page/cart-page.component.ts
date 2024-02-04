import { Component } from '@angular/core';
import { AuthService, UserPayload } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  currentUser: UserPayload | null = null
  defaultAddress: any = null;
  hasDefaultAddress: boolean = false;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
    ) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getCurrentUser() {
    if (this.isLoggedIn()) {
      return this.authService.currentUser;
    }
    return null;
  }

  handleAddressData(address: any) {
    this.usersService.createAddress(address, this.authService.getHeaders(), this.currentUser?.sub as string)
      .subscribe((res: any) => {
        this.defaultAddress = res;
        this.hasDefaultAddress = true;
      });
  }

  ngOnInit() {
    this.currentUser = this.getCurrentUser();
    if (this.currentUser) {
      this.usersService.getDefaulAddress(this.currentUser.sub as string, this.authService.getHeaders())
        .subscribe((res: any) => {
          this.defaultAddress = res;
          if (Object.keys(this.defaultAddress).length > 0) {
            this.hasDefaultAddress = true;
          }
        });
    }

  }

}
