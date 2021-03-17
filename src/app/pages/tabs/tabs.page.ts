import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/respuesta';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public usuario: Usuario;

  constructor(private auth: AuthService) {
    this.usuario = auth.getUsuario();
    console.log('entre tabs');
  }

}
