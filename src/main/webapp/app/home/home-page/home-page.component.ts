/* eslint-disable @angular-eslint/component-selector */

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FooterHomeComponent } from "app/shared/components/footer/footer.component";
import { NavbarHomeComponent } from "app/shared/components/navbar/navbar.component";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ CommonModule, RouterModule ,NavbarHomeComponent, FooterHomeComponent ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

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
