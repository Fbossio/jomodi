import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { alert } from '../../utils/alert';

@Component({
  selector: 'app-manage-addresses',
  templateUrl: './manage-addresses.component.html',
  styleUrls: ['./manage-addresses.component.css']
})
export class ManageAddressesComponent {

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private cdRef: ChangeDetectorRef
    ) { }

  private subscription = new Subscription();
  currentUser: any;
  adresses: any[] = [];

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.subscription.add(this.usersService.getAdresses(this.currentUser.sub, this.authService.getHeaders()).subscribe((res: any) => {
      this.adresses = res.sort((a: any, b: any) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0));
    }));
  }

  changeDefaultAddress(addressId: string) {
    this.subscription.add(this.usersService.changeDefaultAddress(this.currentUser.sub, addressId, this.authService.getHeaders()).subscribe((res: any) => {
      this.adresses = this.adresses.map(address => {
        address.isDefault = address.id === addressId;
        // this.router.navigate(['/profile/manage-addresses']);
        alert('Success', 'Default address changed successfully', 'success');
        return address;
      });
      this.adresses.sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0));
      this.cdRef.detectChanges();
    }));
  }
  deleteAddress(addressId: string) {
    this.subscription.add(this.usersService.deleteAddress(this.currentUser.sub, addressId, this.authService.getHeaders()).subscribe(
      (res: any) => {
        this.adresses = this.adresses.filter(address => address.id !== addressId);
        alert('Success', 'Address deleted successfully', 'success');
        this.cdRef.detectChanges();
      },
      (error: any) => {
        alert('Error', 'Default address cannot be deleted', 'error');
        console.error(error);
      }
    ));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
