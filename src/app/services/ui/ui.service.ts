import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private  loading;

  constructor(private alertController: AlertController,
              private toastController: ToastController) { }

  /**
  * muestra mensajes alerta en la pantalla
  * @param message 
  */
  async AlertInformative(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });
    
    await alert.present();
  }

  /**
  * mensaje toats 
  */
  async toastInformative(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 2000
    });
    toast.present();
    }

  }

  
  