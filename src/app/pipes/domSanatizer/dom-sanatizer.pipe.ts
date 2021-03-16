import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanatizer'
})
export class DomSanatizerPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer){}

  transform(img: string): any {
    const imagen =  `background-image: url('${img }')`;
    console.log(imagen);
    return this.domSanitizer.bypassSecurityTrustStyle(imagen);
  }
}
