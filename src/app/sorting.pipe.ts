import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(value: any, args?: any): any {

  	let swapped;
    do {
        swapped = false;
        for (var i=0; i < value.length-1; i++) {
            if (value[i] > value[i+1]) {
                let temp = value[i];
                value[i] = value[i+1];
                value[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    return value;
  }

}
