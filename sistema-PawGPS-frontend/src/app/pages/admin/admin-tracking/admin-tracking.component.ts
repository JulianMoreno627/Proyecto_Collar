import { Component, OnInit } from '@angular/core';
import { UbicacionService } from '../../../services/ubicacion.service';
import { DispositivoService } from '../../../services/dispositivo.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-admin-tracking',
  templateUrl: './admin-tracking.component.html',
  styleUrls: ['./admin-tracking.component.css']
})
export class AdminTrackingComponent implements OnInit {
  dispositivos: any[] = [];
  dispositivoSeleccionado: any = null;
  ubicacionActual: any = null;
  historialUbicaciones: any[] = [];
  mapa: any;
  marcador: any;
  polyline: any;
  isLoading = true;

  constructor(
    private ubicacionService: UbicacionService,
    private dispositivoService: DispositivoService
  ) {}

  ngOnInit(): void {
    this.cargarDispositivos();
    this.inicializarMapa();
  }

  cargarDispositivos(): void {
    this.dispositivoService.obtenerTodosDispositivos().subscribe(
      (data: any) => {
        this.dispositivos = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error al cargar dispositivos:', error);
        this.isLoading = false;
      }
    );
  }

  seleccionarDispositivo(dispositivo: any): void {
    this.dispositivoSeleccionado = dispositivo;
    this.actualizarUbicacion();
    this.cargarHistorial();
  }

  actualizarUbicacion(): void {
    if (!this.dispositivoSeleccionado) return;

    this.ubicacionService.obtenerUbicacionActual(this.dispositivoSeleccionado.id).subscribe(
      (data: any) => {
        this.ubicacionActual = data;
        this.actualizarMapa();
      },
      error => {
        console.error('Error al obtener ubicación:', error);
      }
    );
  }

  cargarHistorial(): void {
    if (!this.dispositivoSeleccionado) return;

    this.ubicacionService.obtenerHistorialUbicaciones(this.dispositivoSeleccionado.id).subscribe(
      (data: any) => {
        this.historialUbicaciones = data;
        this.dibujarTrayecto();
      },
      error => {
        console.error('Error al obtener historial:', error);
      }
    );
  }

  inicializarMapa(): void {
    this.mapa = L.map('mapa').setView([19.4326, -99.1332], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.mapa);
  }

  actualizarMapa(): void {
    if (!this.ubicacionActual || !this.mapa) return;

    const lat = this.ubicacionActual.latitud;
    const lng = this.ubicacionActual.longitud;

    this.mapa.setView([lat, lng], 15);

    if (this.marcador) {
      this.mapa.removeLayer(this.marcador);
    }

    this.marcador = L.marker([lat, lng]).addTo(this.mapa)
      .bindPopup(`<b>${this.dispositivoSeleccionado.nombre}</b><br>Última actualización: ${new Date(this.ubicacionActual.fechaHora).toLocaleString()}`)
      .openPopup();
  }

  dibujarTrayecto(): void {
    if (!this.historialUbicaciones.length || !this.mapa) return;

    if (this.polyline) {
      this.mapa.removeLayer(this.polyline);
    }

    const puntos = this.historialUbicaciones.map(u => [u.latitud, u.longitud]);

    this.polyline = L.polyline(puntos, {
      color: 'blue',
      weight: 3,
      opacity: 0.7
    }).addTo(this.mapa);
  }
}
