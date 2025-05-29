import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${baserUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios (ruta admin)
  obtenerTodosUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/todos`);
  }

  // Contar usuarios (ruta admin)
  contarUsuarios(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/admin/cantidad`);
  }

  // Eliminar un usuario por ID (ruta admin)
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/${id}`);
  }

  // Obtener un usuario por ID (ruta admin)
  obtenerUsuario(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/${id}`);
  }

  // Añadir nuevo usuario
  añadirUsuario(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, user);
  }
}

