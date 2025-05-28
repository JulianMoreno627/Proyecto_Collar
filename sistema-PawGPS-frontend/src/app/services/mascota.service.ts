import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private apiUrl = 'http://tu-backend.com/api/mascotas';

  constructor(private http: HttpClient) { }

  obtenerMisMascotas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mis-mascotas`);
  }

  obtenerTodasMascotas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/todas`);
  }

  contarMascotas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/admin/cantidad`);
  }

  registrarMascota(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  eliminarMascota(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}