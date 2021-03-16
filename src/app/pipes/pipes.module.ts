import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanatizerPipe } from './domSanatizer/dom-sanatizer.pipe';
import { ImagenPipe } from './imagen/imagen.pipe';



@NgModule({
  declarations: [DomSanatizerPipe, ImagenPipe],
  imports: [
    CommonModule
  ],
  exports:[DomSanatizerPipe, ImagenPipe]
})
export class PipesModule { }
