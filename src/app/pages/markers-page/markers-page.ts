import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element: HTMLElement = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [2.170304, 41.385915], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const marker = new mapboxgl.Marker({
      draggable: true, // mover el marcador
      color: 'red',
    })
      .setLngLat([2.170304, 41.385915])
      .addTo(map);

    marker.on('dragend', (event) => {
      console.log(event);
    });

    this.mapListeners(map);
  }
  mapListeners(map: mapboxgl.Map) {
    console.log('object');
  }
}
