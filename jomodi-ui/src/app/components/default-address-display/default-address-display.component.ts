import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-address-display',
  templateUrl: './default-address-display.component.html',
  styleUrls: ['./default-address-display.component.css']
})
export class DefaultAddressDisplayComponent {

  @Input() defaultAddress: any = null;

}
