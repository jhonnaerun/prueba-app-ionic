import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/respuesta';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public producto: Producto[] = [];
  public infinitDisable: boolean;

  constructor(private productoServices: ProductoService,
              private auth: AuthService) {}


  ngOnInit(): void {
    this.getProductos();
    // subcripcion al servicio crear post que recibe el EventEmitter
    this.productoServices.nuevoProducto.subscribe(post => {
      console.log(post);
      this.producto.unshift(post);
    } );
  }


  /**
   * llama el post de posts services
   * @param event 
   * @param refresh 
   */
   
  getProductos(event?, refresh?: boolean) {
    this.productoServices.getProducto(refresh).subscribe(resp => {
      this.producto.push(...resp.result);
      console.log(this.producto, resp);
      if (event) {
        event.target.complete();
        if (resp.result.length === 0) {
          event.target.disabled = true;
          this.infinitDisable = true;
        } else {
          event.target.disabled = false;
          this.infinitDisable = false;
        }
      }
    });
  }

  /**
   * refresca los posts
   * @param event 
   */
   refreshProductos(event) {
    this.producto = [];
    this.getProductos(event, true);
  }

  logout(){
    this.productoServices.Inicializar();
    this.auth.logout();
  }
}
