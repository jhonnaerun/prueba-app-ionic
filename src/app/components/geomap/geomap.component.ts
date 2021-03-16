import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var mapboxgl: any;

@Component({
  selector: 'app-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.scss'],
})
export class GeomapComponent implements OnInit {

  public isMap = false;

  @Input() coords: string;
  @ViewChild('mapa') mapa: ElementRef;
  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    this.getCoordenadas();
  }
  

  /**
   * obtiene las coordenadas
   */
  getCoordenadas() {
    if (this.coords !== null) {
      this.isMap = true;     
      const coordenadas = this.coords.split(',');
      const latitud = Number(coordenadas[0]);
      const longitud = Number(coordenadas[1]);
      this.mostrarMapa(latitud,longitud);
    }
  }


  /**
   * muestra el mapa con la referencia del elemento por medio del viewchild
   * por medio de mapbox
   */
  mostrarMapa(latitud: Number, longitud: Number) {
    setTimeout(() => {
      mapboxgl.accessToken = 'pk.eyJ1Ijoiamhvbm5hZXJ1biIsImEiOiJja2p2b2Ewems4Z3diMnRucDU1dDNpaTh5In0.U5Sme4QoaGVl2H7l7HCfjA';
      const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitud, latitud],
      zoom: 15,
      });
      const marker = new mapboxgl.Marker().setLngLat([longitud, latitud]).addTo(map)
    }, 10);
  }

}
