import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const path = environment.pathServer;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, user_id: string): string {
    return `${path}/producto/imagen/${user_id}/${img}`;
  }

}
