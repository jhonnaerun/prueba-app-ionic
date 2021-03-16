import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Usuario } from 'src/app/interfaces/respuesta';
import { environment } from 'src/environments/environment.prod';

const path = environment.pathServer;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string = null;
  private usuario: Usuario = {};

  constructor(private http: HttpClient,
              private storage: Storage,
              private navCtrl: NavController) { }
  

  /**
   * servicio login retorna promise<boolean> si se loguea
   */
  async login(email: string, password: string) {
    const data = {email, password};
    return new Promise(resolve => {
      this.http.post(`${path}/usuario/login`, data).subscribe(async (resp: any) => {
        if (resp.Ok) {
          this.token = resp.token;
          await this.guardarToken(this.token);
          resolve(true);
        } else {
          this.token = null;
          this.limpiarStorage();
          resolve(false);
        }
      });
    });
  }

  /**
   * Cierra la sessión del usuario
   */
  logout() {
    this.token = null;
    this.usuario = null;
    this.limpiarStorage();
    this.navCtrl.navigateRoot('/login');
  }


  /**
   * servicio registrar usuario
   * @param usuario 
   */
  register(usuario: Usuario) {
    return new Promise(resolve => {
      this.http.post(`${path}/usuario/crear`, usuario).subscribe(async (resp: any) => {
        console.log('resp', resp);
        if (resp.Ok) {
          this.token = resp.token;
          await this.guardarToken(this.token);
          resolve(true);
        } else {
          this.token = null;
          this.limpiarStorage();
          resolve(false);
        }
      });
    });
  }


  /**
   * retorna el objeto usuario
   */
 getUsuario() {
   if (!this.usuario._id) {
      this.verificarToken();
   }

   return {...this.usuario};
  }

  /**
   * 
   * @param usuario consume servicio actualizar usuario
   */
  actualizarUsuario(usuario : Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {
      this.http.post(`${path}/usuario/actualizar`, usuario, {headers}).subscribe(async(resp: any) =>{
        if(resp.Ok) {
          this.token = resp.token;
          this.usuario = resp.usuario;
          await this.guardarToken(this.token);
          resolve(true);
        } else {
          this.limpiarStorage();
          resolve(false);
        }
      });
    })

  }


  /**
   * guarda el token en el local storage
   * @param token 
   */
  async guardarToken(token: string) {
    console.log('token');
    await this.storage.set('Token-market', token);
    await this.verificarToken();
  }


  /**
   * cargar el token del local storage
   */
  async cargarToken() {
    this.token = await this.storage.get('Token-market');
  }

  /**
   * limpia el local storage
   */
  limpiarStorage() {
    this.storage.clear();
  }


  /**
   * Verifica si el token es valido, resp
   */
  async verificarToken(): Promise<boolean> {
    console.log('guard');
    await this.cargarToken();

    return new Promise(resolve => {
      if (!this.token) {
        this.navCtrl.navigateRoot('/login');
        return resolve(false);
      }

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${path}/usuario/`, {headers}).subscribe((resp: any) => {
        if (resp.ok) {
          this.usuario = resp.usuario;
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }
}
