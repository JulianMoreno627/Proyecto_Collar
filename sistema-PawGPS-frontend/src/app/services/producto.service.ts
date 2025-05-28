// src/app/productos/services/producto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../components/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://tu-backend.com/api/productos';

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  obtenerProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  crearProducto(producto: Producto, imagen: File): Observable<Producto> {
    const formData = new FormData();
    formData.append('producto', JSON.stringify(producto));
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.post<Producto>(this.apiUrl, formData);
  }

  actualizarProducto(id: number, producto: Producto, imagen: File): Observable<Producto> {
    const formData = new FormData();
    formData.append('producto', JSON.stringify(producto));
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, formData);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}