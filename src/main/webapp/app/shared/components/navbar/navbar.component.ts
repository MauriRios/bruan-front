/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarHomeComponent implements OnInit {

  constructor(){
    
  }

  ngOnInit(): void {
    this.navBarSticky();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  navBarSticky(){
    const headerStick = document.querySelector(".sticky-top");
    window.onscroll = function () {
      if (window.scrollY > 80) {
        headerStick?.classList.add("sticky_element");
      } else {
        headerStick?.classList.remove("sticky_element");
      }
    };
    
  }

}
