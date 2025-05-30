// src/app/productos/components/productos/productos.component.ts
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../components/models/producto.model';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  loading = true;

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      productos => {
        this.productos = productos;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar productos:', error);
        this.loading = false;
      }
    );
  }

  verDetalle(id: number): void {
    this.router.navigate(['/productos', id]);
  }
}

