import { Component } from '@angular/core';
import { LineTitleDirective } from 'app/shared/directives/line-title.directive';
import { DynamicVerticalCardComponent } from '../dynamic-vertical-card/dynamic-vertical-card/dynamic-vertical-card.component';
import { BioCardsComponent } from "../bio-cards/bio-cards/bio-cards.component";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'app-follow-us',
    standalone: true,
    templateUrl: './follow-us.component.html',
    styleUrl: './follow-us.component.css',
    imports: [LineTitleDirective, BioCardsComponent]
})
export class FollowUsComponent {

}
