import { Component } from '@angular/core';
import { LineTitleDirective } from 'app/shared/directives/line-title.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-follow-us',
  standalone: true,
  imports: [LineTitleDirective],
  templateUrl: './follow-us.component.html',
  styleUrl: './follow-us.component.css'
})
export class FollowUsComponent {

}
