import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

slideOpts = {
  slidesPerView: 3.5,
  freeMode: true
};

  @Input() avatarBd: string = 'av-1.png';
  @Output() avatar = new EventEmitter <string> ();
  constructor() { }

  ngOnInit() {
    this.seleccionAvatar(this.avatarBd);
  }

  /**
   * Cambia el estado seleccionado de todos los avatar y el seleccionado
   * @param avatar 
   */
  seleccionAvatar(avatar) {
    this.avatars.forEach(avatarFor => {
      if (avatarFor.img === avatar) {
        avatarFor.seleccionado = true;
      } else {
        avatarFor.seleccionado = false;
      }
    });
    this.avatar.emit(avatar);
  }
}
