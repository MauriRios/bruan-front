import { Component, Input } from '@angular/core';
import { BioCardsComponent } from '../../bio-cards/bio-cards/bio-cards.component';

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

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  accion() {
  }
}
