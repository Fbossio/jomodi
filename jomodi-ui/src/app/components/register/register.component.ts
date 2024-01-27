import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpCredentials } from '../../core/models/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
        'firstName': ['', Validators.compose([Validators.required])],
        'lastName': ['', Validators.compose([Validators.required])],
        'email': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required])]
    });
  }

  signUp(credentials: SignUpCredentials) {
    this.authService.signup(credentials)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/']);
          this.formSubmitted = true;
        }
      });
  }

}
