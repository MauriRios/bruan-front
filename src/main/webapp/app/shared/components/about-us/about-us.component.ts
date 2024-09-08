import { Component } from '@angular/core';
import { LineTitleDirective } from 'app/shared/directives/line-title.directive';
import { DynamicVerticalCardComponent } from '../dynamic-vertical-card/dynamic-vertical-card/dynamic-vertical-card.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [LineTitleDirective, DynamicVerticalCardComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
