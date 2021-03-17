import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto, Usuario } from 'src/app/interfaces/respuesta';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActualizarProductoComponent } from '../actualizar-producto/actualizar-producto.component';
import { ComprarProductoComponent } from '../comprar-producto/comprar-producto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  public showMap = false;
  public usuario: Usuario;

  slideOne = {
    allowSlideNext: false,
    allowSlidePrev: false
  }

  @Input() producto: Producto;
  constructor(private modalController: ModalController,
              private auth: AuthService) { }

  ngOnInit() {    
    this.usuario = this.auth.getUsuario();
  }

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
