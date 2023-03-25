import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: string, key: string): any {
    if (!items || !filter) {
      return items;
    }
    if (key === 'students') {
      return items.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      console.log(items);
      return items.filter((item) =>
        item.title.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // console.log(items, '---pipe---', filter);
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
  }
}
