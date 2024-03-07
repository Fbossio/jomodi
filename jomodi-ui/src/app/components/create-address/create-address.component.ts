import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { alert } from '../../utils/alert';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent {

  private subscription = new Subscription();
  form!: FormGroup;
  formSubmitted: boolean = false;
  currentUser: any = null;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
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

  ngOnInit() {
    this.currentUser = this.getCurrentUser();
    this.form = this.fb.group({
      'address': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'zip': ['', Validators.compose([Validators.required])],
      'country': ['', Validators.compose([Validators.required])],
    })
  }

  createAddress(address: any) {
    this.formSubmitted = true;
    if (this.form.invalid) return;
    this.subscription.add(this.usersService.createAddress(address, this.authService.getHeaders(), this.currentUser?.sub as string).subscribe(
      (res: any) => {
        alert('Success', 'Address created successfully', 'success');
        this.form.reset();
        this.router.navigate(['/profile/manage-addresses']);
      },
      (error: any) => {
        alert('Error', 'Address cannot be created', 'error');
        console.error(error);
      }
    ));
  }
}
