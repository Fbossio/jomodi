import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from '../../core/models/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  invalidLogin: boolean = false;
  formSubmitted: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
        'email': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required])]
    });
}

  signIn(credentials: LoginCredentials) {
    this.authService.login(credentials)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/']);
          this.formSubmitted = true;
        } else {
          this.invalidLogin = true;
        }
      });
  }

}
