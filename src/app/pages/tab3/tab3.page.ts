import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/respuesta';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  private loading;

  public usuario: Usuario = {};

  constructor(private auth: AuthService,
              private mensajeAlert: UiService,
              private navCtrl: NavController,
              private loadingController: LoadingController,
              private producto: ProductoService) {
    this.getUsuario();
  }

  /**
   * obtiene el usuario
   */
  getUsuario() {
    this.usuario = this.auth.getUsuario();
  }


  /**
   * llama al servicio de actualizar el usuario
   */
  actualizar() {
    this.mostrarLoading();
    delete this.usuario.password;
    
    console.log(this.usuario);
    this.auth.actualizarUsuario(this.usuario).then(resp => {
      this.cerrarLoading();
      if (resp) {
        this.mensajeAlert.toastInformative('El usuario ha sido Actualizado con exito!!!');
      } else {
        this.mensajeAlert.toastInformative('No se pudo actualizar!!');
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  /**
   * Llama el servicio de logout
   */
  logout(){
    this.producto.Inicializar();
    this.auth.logout();
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
