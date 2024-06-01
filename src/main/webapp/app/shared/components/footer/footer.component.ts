/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-footer',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterHomeComponent {

}
