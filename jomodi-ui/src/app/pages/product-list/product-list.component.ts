import { Component, OnInit } from '@angular/core';
import { products } from './poducts';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any[] = [];

  ngOnInit(): void {
    this.products = products;
  }

}
