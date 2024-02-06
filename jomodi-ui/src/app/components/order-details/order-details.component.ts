import { Component, Input } from '@angular/core';
import { Order } from '../../core/models/order.interface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @Input() order: Order | null = null;

}
