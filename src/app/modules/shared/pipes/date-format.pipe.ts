import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | null) {
    var datePipe = new DatePipe('fr-TN');
    value = datePipe.transform(value, 'EEEE, d MMMM ');
    return value;
  }
}
