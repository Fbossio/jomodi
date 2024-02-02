import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})
export class CartFormComponent {
  form!: FormGroup;
  formSubmitted: boolean = false;

  constructor(private fb: FormBuilder,) {}

  sendAddress(address: any) {
    console.log(address);
    this.formSubmitted = true;
  }

  ngOnInit() {
    this.form = this.fb.group({
      'address': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'zip': ['', Validators.compose([Validators.required])],
      'country': ['', Validators.compose([Validators.required])],
    })
  }
}
