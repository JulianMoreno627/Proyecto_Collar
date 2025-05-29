// src/app/services/ubicacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private apiUrl = 'http://tu-backend.com/api/ubicaciones';

  constructor(private http: HttpClient) { }

  registrarUbicacion(latitud: number, longitud: number, dispositivoId: number): Observable<any> {
    return this.http.post(this.apiUrl, null, {
      params: {
        latitud: latitud.toString(),
        longitud: longitud.toString(),
        dispositivoId: dispositivoId.toString()
      }
    });
  }

  obtenerUbicacionActual(dispositivoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/actual`, {
      params: { dispositivoId: dispositivoId.toString() }
    });
  }

  obtenerHistorialUbicaciones(dispositivoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/historial`, {
      params: { dispositivoId: dispositivoId.toString() }
    });
  }
}