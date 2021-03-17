import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  public ventas;
  public impuestos;
  public totalCompras;

  constructor(private productoService: ProductoService) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.obtenerVentas();
  }

  obtenerVentas() {
    this.productoService.obtenerVentas().subscribe((resp: any) => {
       if (resp.Ok) {
         this.ventas = resp.result.productos;
         this.impuestos = resp.result.impuestos;
         this.totalCompras = resp.result.totalCompras
         console.log(resp);
       }
    });
  }

}
