/* eslint-disable @angular-eslint/component-selector */

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProductCardComponent } from "app/shared/components/card/card.component";
import { SliderComponent } from "app/shared/components/slider/slider.component";


@Component({
  selector: 'app-home-navigation',
  standalone: true,
  imports: [ CommonModule,RouterModule, SliderComponent, ProductCardComponent,  ],
  templateUrl: './home-navigation.component.html',
  styleUrl: './home-navigation.component.css'
})
export class HomeNavigationComponent implements OnInit {

  windowScrolled = false;

  constructor() {

  }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  
  }
}
