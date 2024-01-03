import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {


  slides: any[] = [];

  ngOnInit(): void {
    this.slides = [
      {id: 1, imageUrl: '/assets/4712256.jpg'},
      {id: 2, imageUrl: '/assets/4773142.jpg'},
      {id: 3, imageUrl: '/assets/5594188.jpg'},
      {id: 4, imageUrl: '/assets/4810804.jpg'},
      {id: 5, imageUrl: '/assets/6874380.jpg'},
      {id: 6, imageUrl: '/assets/6003842.jpg'}
    ];
  }



}
