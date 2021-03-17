import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { GeomapComponent } from './geomap/geomap.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './producto/producto.component';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';
import { FormsModule } from '@angular/forms';
import { ComprarProductoComponent } from './comprar-producto/comprar-producto.component';



@NgModule({
  declarations: [
    AvatarSelectorComponent,
    GeomapComponent,
    ProductosComponent,
    ProductoComponent,
    ActualizarProductoComponent,
    ComprarProductoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule
  ],
  exports: [    
    AvatarSelectorComponent,
    GeomapComponent,
    ProductosComponent,
    ProductoComponent,
    ComprarProductoComponent
  ],
  entryComponents: [ActualizarProductoComponent]
})
export class ComponentsModule { }
