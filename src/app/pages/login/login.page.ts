import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/respuesta';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loading;

  public userLogin = {
    email: '',
    password: ''
  };
  
  public userRegis: Usuario = {
    nombre: '',
    email: '',
    ciudad: '',
    direccion: '',
    administrador: false,
    password: '',
  };
  
    @ViewChild('slides', { static: false }) slides: IonSlides;
    constructor(private auth: AuthService,
                private navCtrl: NavController,
                private uiServices: UiService,
                private loadingController: LoadingController) { }
  
    ngOnInit() {
    }
  
  
    /**
     * llama el login del auth services
     */
    async login(){
        this.mostrarLoading();
        const isLogin = await this.auth.login(this.userLogin.email, this.userLogin.password);
        if (isLogin) {     
          this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
        } else {
          this.uiServices.AlertInformative('Usuario/contraseña no son correctas');
        }
        this.cerrarLoading();
    }
  
    /**
     * llama el register del auth services
     */
    async registrar() {
      this.mostrarLoading();
      const iscreate = await this.auth.register(this.userRegis);
      if (iscreate) {
        this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
      } else {
        this.uiServices.AlertInformative('El usuario creado ya existe');
      }
      this.cerrarLoading();
    }
  
    /**
     * navega al slide login
     */
    mostrarLogin() {
      this.slides.slidePrev();
    }
    
    /**
     * navega al slide registrar
     */
    mostrarRegistro() {
      this.slides.slideNext();
    }

    /**
     * mostrar loading
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
    * cerrar loading
    */
   async cerrarLoading() {
     this.loading.dismiss();
   }
}
