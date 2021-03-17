import { Component } from '@angular/core';
import { Producto, Usuario } from 'src/app/interfaces/respuesta';
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

  private categoriaSeleccionada = 'General';
  public categorias = [
    {
      categoria: 'General'
     },
    {
    categoria: 'Tecnologia'
   },
   {
    categoria: 'Electrodomesticos'
   },
   {
    categoria: 'Video juegos'
   },
   {
    categoria: 'Ropa'
   },
   {
    categoria: 'Hogar'
   }];

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
   
  getProductos(event?, refresh?: boolean, categoria?: string) {
    if (categoria && categoria !== this.categoriaSeleccionada) {
      this.categoriaSeleccionada = categoria;      
      this.productoServices.Inicializar();
      this.producto = [];
    } 
    this.productoServices.getProducto(refresh, categoria).subscribe(resp => {
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

  filtrarPorCategoria(event) {
    this.getProductos(undefined, true, event.detail.value);
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
