import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private baseUrl = 'http://localhost:8081/api/mascotas';

  constructor(private http: HttpClient) { }

  obtenerMisMascotas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mis-mascotas`);
  }

  obtenerTodasMascotas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/todas`);
  }

  contarMascotas(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/admin/cantidad`);
  }

  registrarMascota(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

  actualizarMascota(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, formData);
  }

  eliminarMascota(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  obtenerMascota(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
