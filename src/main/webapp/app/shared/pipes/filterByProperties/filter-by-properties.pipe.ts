import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../../../core/models/card';

@Pipe({
  name: 'filterByProperties',
  standalone: true
})
export class FilterByPropertiesPipe implements PipeTransform {

  transform(cards: Card[], ...searchArgs: string[]): Card[] {

    const [query, ...properties]: string[] = searchArgs;

    if(!this.isValidArray(cards)) return cards;
    if(!this.hasValidSearchQuery(query)) return cards;
    const lowerQuery = query.toLowerCase();

    return this.filterByString(cards, lowerQuery, properties);

  }


  hasValidSearchQuery(query: string): boolean {
    return !(!query || query.length < 3);
  }

  filterByString(cards: Card[], lowerQuery: string, properties: string[]): Card[] {
    return cards.filter((card) =>
      properties
    .flat()
    .some((property) => (card[property] as string).toLowerCase().includes(lowerQuery))
    );
  }

  isValidArray(cards: Card[]): boolean {
    return Array.isArray(cards); 
  }

}
