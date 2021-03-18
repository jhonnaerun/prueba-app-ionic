import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/respuesta';


declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private loading;

  public tallas = ['XS', 'S', 'M', 'L', 'XL'];
  public colores = ['Negro', 'Gris', 'Rojo', 'Verde', 'Amarillo', 'Blanco'];

  public tempImages: string[] = [];

  public modificador = {
    talla: [],
    color: []
  };

  public habilitar= {
    talla: false,
    color: false
  }

  public productoNuevo: Producto = {
    impuesto: 0,
    nombre: '',
    precio: 0,
    categoria: '',
    descripcion: '',
    estado: true,
    cantidad: 0,
  };
  public isLocalizando = false;

  constructor(private producto: ProductoService,
              private loadingController: LoadingController,
              private mensajesServices: UiService,
              private router: Router,
              private geolocation: Geolocation,
              private camara: Camera) {}

  /**
   * llama servicio crear producto
   */
  crearProducto() {
    this.mostrarLoading();
    console.log(this.productoNuevo);
    this.producto.crearProducto(this.productoNuevo).then(resp => {
      if (resp) {
        this.productoNuevo = {
          impuesto: 0,
          nombre: '',
          precio: 0,
          descripcion: '',
          categoria: '',
          estado: true,
          cantidad: 0,
          modificador: undefined
        };
        this.tempImages = [];
        this.cerrarLoading();
        this.mensajesServices.toastInformative('Creado con exito');
        this.router.navigateByUrl('/main/tabs/tab1');
      }
    });
  }

  crear() {
    if (this.modificador.color.length !== 0 || this.modificador.talla.length!==0) {      
      this.producto.crearModificador(this.modificador).subscribe((resp: any )=>{
          console.log(resp);
          this.productoNuevo.modificador = resp.result._id;
          this.crearProducto();
      });
    } else {
      this.crearProducto();
    }

  }

  /**
   * abre la camara y la carga la imagen tras tomar una foto
   */
  cargarCamara() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camara.DestinationType.FILE_URI,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camara.PictureSourceType.CAMERA
    }

    this.procesarImagen(options);
  }


  /**
   * abre la galeria y carga la imagen tras seleccionar una foto
   */
  cargarGaleria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camara.DestinationType.FILE_URI,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camara.PictureSourceType.PHOTOLIBRARY
    }
    
    this.procesarImagen(options);
  }

  /**
   * procesa la imagen y la carga en pantalla
   * @param options
   */
  procesarImagen(options: CameraOptions ) {
    this.camara.getPicture(options).then((imageData) => {
      console.log(imageData);
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.producto.cargarImagen(imageData);
      this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }

  /**
   * Mostrar loading
   */
  async mostrarLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
     this.loading.present();
     this.cerrarLoading();
   }

 /**
  * Cerrar loading
  */
 async cerrarLoading() {
   this.loading.dismiss();
 }

}
