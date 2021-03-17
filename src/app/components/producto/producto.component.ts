import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/respuesta';
import { ActualizarProductoComponent } from '../actualizar-producto/actualizar-producto.component';
import { ComprarProductoComponent } from '../comprar-producto/comprar-producto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  public showMap = false;

  slideOne = {
    allowSlideNext: false,
    allowSlidePrev: false
  }

  @Input() producto: Producto;
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async actualizarProducto() {
    const modal = await this.modalController.create({
      component: ActualizarProductoComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'producto': this.producto,
      }
    });
    return await modal.present();
  }


  async comprarProducto() {
    const modal = await this.modalController.create({
      component: ComprarProductoComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'producto': this.producto,
      }
    });
    return await modal.present();
  }
}
