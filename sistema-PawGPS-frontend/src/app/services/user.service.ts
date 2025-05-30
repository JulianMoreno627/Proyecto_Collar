import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from './helper';
import { Usuario } from '../components/models/usuario.model'; // Corregida la ruta de importación

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${baserUrl}/api`;
  private adminEndpoint = `${this.apiUrl}/admin/usuarios`;
  private userEndpoint = `${this.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  // Método privado para obtener headers con token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token || ''}` // Manejo seguro si token es null
    });
  }

  // 🔹 ADMIN: Obtener todos los usuarios
  obtenerTodosUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.adminEndpoint}/todos`, { 
      headers: this.getHeaders() 
    });
  }

  // 🔹 ADMIN: Crear usuario administrador
  crearAdmin(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.adminEndpoint}?esAdmin=true`, usuario, {
      headers: this.getHeaders()
    });
  }

  // 🔹 ADMIN: Contar usuarios
  contarUsuarios(): Observable<number> {
    return this.http.get<number>(`${this.adminEndpoint}/contar`, {
      headers: this.getHeaders()
    });
  }

  // 🔹 ADMIN: Eliminar un usuario por ID
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminEndpoint}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // 🔹 ADMIN: Obtener un usuario por ID
  obtenerUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.adminEndpoint}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // 🔹 GENERAL: Añadir nuevo usuario
  añadirUsuario(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.userEndpoint}`, user, {
      headers: this.getHeaders() // Añadido headers para consistencia
    });
  }

  // 🔹 GENERAL: Obtener todos los usuarios
  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.userEndpoint}`, {
      headers: this.getHeaders()
    });
  }

  // 🔹 GENERAL: Contar usuarios
  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.userEndpoint}/contar`, {
      headers: this.getHeaders()
    });
  }

  // 🔹 GENERAL: Eliminar un usuario
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.userEndpoint}/${userId}`, {
      headers: this.getHeaders()
    });
  }

  // 🔹 GENERAL: Obtener detalles de un usuario
  getUsuario(userId: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.userEndpoint}/${userId}`, {
      headers: this.getHeaders()
    });
  }

  // 🔹 GENERAL: Actualizar usuario
  actualizarUsuario(userId: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.userEndpoint}/${userId}`, usuario, {
      headers: this.getHeaders()
    });
  }
}