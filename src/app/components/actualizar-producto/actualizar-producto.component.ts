import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/respuesta';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.scss'],
})
export class ActualizarProductoComponent implements OnInit {

  slideOne = {
    allowSlideNext: false,
    allowSlidePrev: false
  }

  @Input() producto: Producto;
  constructor(private modalCtrl: ModalController,
              private productoServices: ProductoService,
              private uiServices: UiService) { }

  ngOnInit() {}


  actualizar() {
    console.log(this.producto);
    this.productoServices.actualizarProducto(this.producto).then(resp => {
      if (resp) {
        this.uiServices.toastInformative('El producto se ha actualizado');
      } else {
        this.uiServices.AlertInformative('No se pudo realizar la actualización');
      }
      this.cerrarModal();
    });
  }

  eliminar() {

    const producto_id = {
      _id: this.producto._id    
    };
    

    this.productoServices.eliminarProducto(producto_id).subscribe((resp: any) => {
        if (resp.Ok) {
            this.uiServices.toastInformative(resp.result);
            this.cerrarModal();
        } else {
          this.uiServices.AlertInformative(resp.mensaje);
        }
    });
  }


  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}
