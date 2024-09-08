import { Component } from '@angular/core';
import { DynamicVerticalCardComponent } from '../../dynamic-vertical-card/dynamic-vertical-card/dynamic-vertical-card.component';

@Component({
  selector: 'bio-cards',
  standalone: true,
  imports: [DynamicVerticalCardComponent],
  templateUrl: './bio-cards.component.html',
  styleUrl: './bio-cards.component.css'
})
export class BioCardsComponent {

}
