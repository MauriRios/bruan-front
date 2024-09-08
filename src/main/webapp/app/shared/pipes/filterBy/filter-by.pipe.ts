import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true
})
export class FilterByPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) {return value;}
    const result = [];
    for (const post of value) {
      if (post.title.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        result.push(post);
      };
    };
    return result;
  }

  

}
