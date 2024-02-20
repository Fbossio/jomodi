import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { selectOrder } from '../../state/selectors/order.selector';
import { selectClientSecret } from '../../state/selectors/paymentIntent.selector';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { Subscription } from 'rxjs';
import { Order } from '../../core/models/order.interface';
import { AppState } from '../../state/app.state';
import { alert } from '../../utils/alert';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  @ViewChild(StripeCardComponent) card: StripeCardComponent | undefined;

  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        fontWeight: 400,
        fontFamily: 'Circular',
        fontSize: '14px',
        iconColor: '#666EE8',
        color: '#002333',
        '::placeholder': {
          color: '#919191',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  paymentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private stripeService: StripeService
    ) {}

  private subscriptions = new Subscription();
  order: Order | null = null;
  clientSecret: string | null = null;

  ngOnInit() {

    this.paymentForm = this.fb.group({
      name: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      amount: [{value: '', disabled: true}],
    });

    this.subscriptions.add(
      this.store.select(selectOrder).subscribe(order => {
        this.order = order;
        if (this.order) {

          const amount = Number(this.order.data.costs.totalCost);

          const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

          this.paymentForm.patchValue({
            name: `${this.order.data.firstName} ${this.order.data.lastName}`,
            email: this.order.data.email,
            amount: amount.toFixed(2),
          });
        }
      })
    );

    this.subscriptions.add(
      this.store.select(selectClientSecret).subscribe(clientSecret => {
          this.clientSecret = clientSecret.clientSecret;
        })
    );
  }

  confirmPayment() {
    if (this.card) {
      this.stripeService
        .confirmCardPayment(this.clientSecret as string, {
          payment_method: {
            card: this.card.element,
            billing_details: {
              name: this.paymentForm.get('name')?.value,
            },
          },
        })
        .subscribe((result) => {
          if (result.error) {
            console.log('Error', result.error);
          } else {
            if (result.paymentIntent?.status === 'succeeded') {
              this.router.navigate(['/']);
              alert('Payment successful', 'Your payment was successful', 'success');
            }
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
