import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/respuesta';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-comprar-producto',
  templateUrl: './comprar-producto.component.html',
  styleUrls: ['./comprar-producto.component.scss'],
})
export class ComprarProductoComponent implements OnInit {

  slideOne = {
    allowSlideNext: false,
    allowSlidePrev: false
  }
  
  public cantidad = 0;

  @Input() producto: Producto;
  constructor(private modalCtrl: ModalController,
              private productoServices: ProductoService,
              private uiServices: UiService) { }

  ngOnInit() {
    console.log(this.producto);
  }
  

  comprar(){
    if (this.cantidad>0) {
      const data = {
        producto: this.producto._id,
        cantidad: this.cantidad
      }
      this.productoServices.comprarProducto(data).subscribe((resp: any) => {
        if (resp.Ok) {
          this.uiServices.toastInformative('Tu compra esta en camino');
          this.cerrarModal();
        } 
        if (!resp.Ok) {
          this.uiServices.AlertInformative(resp.mensaje);
          this.cerrarModal();
        }
      });
    } else {
      this.uiServices.AlertInformative("La cantidad no es valida");
    }

  }

  

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}
