/* eslint-disable @angular-eslint/component-selector */

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProductCardComponent } from "app/shared/components/card/card.component";
import { DynamicCategoriesComponent } from "app/shared/components/dynamic-categories/dynamic-categories/dynamic-categories.component";
import { FollowUsComponent } from "app/shared/components/follow-us/follow-us.component";
import { SliderComponent } from "app/shared/components/slider/slider.component";
import { LineTitleDirective } from "app/shared/directives/line-title.directive";


@Component({
    selector: 'app-home-navigation',
    standalone: true,
    templateUrl: './home-navigation.component.html',
    styleUrl: './home-navigation.component.css',
    imports: [CommonModule, RouterModule, SliderComponent, ProductCardComponent, FollowUsComponent, LineTitleDirective, DynamicCategoriesComponent ]
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
