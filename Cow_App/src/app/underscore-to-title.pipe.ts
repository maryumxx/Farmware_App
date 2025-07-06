import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underscoreToTitle',
  standalone: true
})
export class UnderscoreToTitlePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return value
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize each word
  }
}
