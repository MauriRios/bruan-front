import { Component, Input } from '@angular/core';
import { BioCardsComponent } from '../../bio-cards/bio-cards/bio-cards.component';
import { Router } from '@angular/router';

@Component({
  selector: 'dynamic-vertical-card',
  standalone: true,
  imports: [BioCardsComponent],
  templateUrl: './dynamic-vertical-card.component.html',
  styleUrl: './dynamic-vertical-card.component.css'
})
export class DynamicVerticalCardComponent {
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() imagen: string = '';

  constructor(private router: Router) {}
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  navigateToUrl() {
    window.open('https://wa.me/c/5491126786057', '_blank');
  }
}
