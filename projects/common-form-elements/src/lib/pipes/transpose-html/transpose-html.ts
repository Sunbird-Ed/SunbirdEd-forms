import { Pipe, PipeTransform } from '@angular/core';

@Pipe(
    { name: 'transposeHtml' }
)

export class TransposeHtmlPipe implements PipeTransform {

  constructor() {}

  transform(value: { contents: string, values: string[] }): string {
    if(!value.values) {
      return value.contents;
    }
    return Object.keys(value.values).reduce((acc, val) => {
      return acc.replace(val, value.values[val] ? value.values[val] : '');
    }, value.contents);

  }
}
