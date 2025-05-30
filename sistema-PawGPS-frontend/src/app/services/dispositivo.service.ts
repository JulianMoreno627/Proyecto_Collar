import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  private apiUrl = 'http://tu-backend.com/api/dispositivos';

  constructor(private http: HttpClient) { }

  obtenerTodosDispositivos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  obtenerMisDispositivos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario`);
  }

  obtenerDispositivoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  registrarDispositivo(dispositivo: any): Observable<any> {
    return this.http.post(this.apiUrl, dispositivo);
  }

  eliminarDispositivo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  contarDispositivosActivos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/contar`);
  }

  // Método nuevo para obtener dispositivos de un usuario por ID
  obtenerDispositivosPorUsuario(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}
