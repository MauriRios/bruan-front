/* eslint-disable @angular-eslint/component-selector */

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Card, mockCards } from "app/core/models/card";
import { AnimationTranslateTopHoverDirective } from "app/shared/directives/animation-translate-top-hover.directive";
import { FilterByPipe } from "app/shared/pipes/filterBy/filter-by.pipe";
import { NgxPaginationModule } from "ngx-pagination";


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ CommonModule, AnimationTranslateTopHoverDirective, NgxPaginationModule, FilterByPipe, FormsModule ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class ProductCardComponent implements OnInit {

  public cards : Card[];
  public page!: number;
  
  title = '';

  constructor(

  ) {
    this.cards = mockCards

  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    
  }


}


