// src/app/productos/components/carrito/carrito.component.ts
import { Component, OnInit } from '@angular/core';
import { CarritoService, ItemCarrito } from '../../../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: ItemCarrito[] = [];
  total = 0;

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(items => {
      this.items = items;
      this.total = this.carritoService.obtenerTotal();
    });
  }

  actualizarCantidad(item: ItemCarrito, cantidad: number): void {
    this.carritoService.actualizarCantidad(item.producto.id, cantidad);
  }

  eliminarItem(id: number): void {
    this.carritoService.eliminarProducto(id);
  }

  procederAlPago(): void {
    this.router.navigate(['/checkout']);
  }
}