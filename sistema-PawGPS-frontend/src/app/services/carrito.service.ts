// src/app/productos/services/carrito.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../components/models/producto.model';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoItems: ItemCarrito[] = [];
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  agregarProducto(producto: Producto, cantidad: number = 1): void {
    const itemExistente = this.carritoItems.find(item => item.producto.id === producto.id);
    
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.carritoItems.push({ producto, cantidad });
    }
    
    this.actualizarCarrito();
  }

  eliminarProducto(id: number): void {
    this.carritoItems = this.carritoItems.filter(item => item.producto.id !== id);
    this.actualizarCarrito();
  }

  actualizarCantidad(id: number, cantidad: number): void {
    const item = this.carritoItems.find(item => item.producto.id === id);
    if (item) {
      item.cantidad = cantidad;
      this.actualizarCarrito();
    }
  }

  vaciarCarrito(): void {
    this.carritoItems = [];
    this.actualizarCarrito();
  }

  obtenerTotal(): number {
    return this.carritoItems.reduce(
      (total, item) => total + (item.producto.precio * item.cantidad), 0
    );
  }

  private actualizarCarrito(): void {
    this.carritoSubject.next([...this.carritoItems]);
  }
}