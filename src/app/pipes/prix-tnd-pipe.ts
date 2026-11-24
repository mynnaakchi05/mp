import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prixTND',
})
export class PrixTNDPipe implements PipeTransform {
  transform(prix:number):string {
    return prix+' DT';
  }
}
