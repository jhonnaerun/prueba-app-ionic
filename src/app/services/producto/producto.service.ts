import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Producto, RespuestaProducto } from 'src/app/interfaces/respuesta';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../auth/auth.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const pathServer = environment.pathServer;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private pagina = 0;
  public nuevoProducto = new EventEmitter<Producto>();

  constructor(private http: HttpClient,
              private auth: AuthService,
              private fileTransfer: FileTransfer) { }

  /**
   * consume el servicio producto por pagina
   * @param refresh 
   */
  getProducto(refresh?: boolean, categoria?: any) {
    if (refresh) {
      this.pagina = 0;
    }
    this.pagina ++;
    console.log(categoria);
    if (categoria && categoria.categoria !== 'General') {
      console.log('entro');
      return this.http.get<RespuestaProducto>(`${pathServer}/producto/?pagina=${this.pagina}&categoria=${categoria.categoria}`);
    } else {
      return this.http.get<RespuestaProducto>(`${pathServer}/producto/?pagina=${this.pagina}`);
    }
  }


  /**
   * petición al servicio crear producto emite para una subscripcion en el tab1 home - y promesa que
   * retorna si el proceso fue exitoso
   */
  crearProducto(producto: Producto) {
    const headers = new HttpHeaders({
      'x-token': this.auth.token
    });
    return new Promise(resolve => {
      this.http.post(`${pathServer}/producto/crear`, producto, {headers}).subscribe(async(resp: any) => {
       if (resp.Ok) {
         await this.nuevoProducto.emit(resp.result);
         resolve(true);
       } else {
         resolve(false);
       }
     });
    })
  }

  crearModificador(modificador) {
    const headers = new HttpHeaders({
      'x-token': this.auth.token
    });

    return this.http.post(`${pathServer}/configuracion/crear-modificador`, modificador, {headers})
  }


   /**
   * petición al servicio crear producto emite para una subscripcion en el tab1 home - y promesa que
   * retorna si el proceso fue exitoso
   */
    actualizarProducto(producto: Producto) {
      const headers = new HttpHeaders({
        'x-token': this.auth.token
      });
      return new Promise(resolve => {
        this.http.post(`${pathServer}/producto/actualizar`, producto, {headers}).subscribe(async(resp: any) => {
         if (resp.Ok) {
           resolve(true);
         } else {
           resolve(false);
         }
       });
      });
    }


       /**
   * petición al servicio crear producto emite para una subscripcion en el tab1 home - y promesa que
   * retorna si el proceso fue exitoso
   */
    eliminarProducto(producto_id) {
         const headers = new HttpHeaders({
           'x-token': this.auth.token
         });
           return this.http.post(`${pathServer}/producto/eliminar`, producto_id, {headers});
       }

   /**
   * petición al servicio crear producto emite para una subscripcion en el tab1 home - y promesa que
   * retorna si el proceso fue exitoso
   */
    comprarProducto(producto) {
        const headers = new HttpHeaders({
           'x-token': this.auth.token
         });
  
         return  this.http.post(`${pathServer}/producto/comprar`, producto, {headers});
    }


    obtenerVentas() {
      const headers = new HttpHeaders({
        'x-token': this.auth.token
      });

      return this.http.get(`${pathServer}/producto/ventas`, {headers});
    }


  /**
   * Carga la imagen en el servidor en la carpeta temporal
   * @param imagen
   */
  cargarImagen(imagen: string) {

    const options: FileUploadOptions = {
      fileKey: 'imagen',
      headers: {
        'x-token': this.auth.token
      }
    };
    
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(imagen, `${pathServer}/producto/upload`, options).then(data => {
      console.log('cargar foto', data);
    }).catch(err => {
      console.log('error', err);
    });
    
  }

  /**
   * Inicializa las page Metodo usado para cerrar sessión
   */
  Inicializar() {
    this.pagina = 0;
  }
}
