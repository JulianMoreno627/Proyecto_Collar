import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';

@Component({
  selector: 'app-admin-mascotas',
  templateUrl: './admin-mascotas.component.html',
  styleUrls: ['./admin-mascotas.component.css']
})
export class AdminMascotasComponent implements OnInit {
  mascotas: any[] = [];
  totalMascotas: number = 0;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    // Cargar ambas cosas en paralelo
    Promise.all([
      this.cargarMascotas(),
      this.cargarTotalMascotas()
    ]).finally(() => {
      this.isLoading = false;
    });
  }

  cargarMascotas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.mascotaService.obtenerTodasMascotas().subscribe(
        (data: any) => {
          this.mascotas = data;
          resolve();
        },
        error => {
          console.error('Error al cargar mascotas:', error);
          this.errorMessage = 'Error al cargar la lista de mascotas';
          reject(error);
        }
      );
    });
  }

  cargarTotalMascotas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.mascotaService.contarMascotas().subscribe(
        (total: number) => {
          this.totalMascotas = total;
          resolve();
        },
        error => {
          console.error('Error al contar mascotas:', error);
          this.errorMessage = 'Error al cargar el total de mascotas';
          reject(error);
        }
      );
    });
  }

  refrescar(): void {
    this.cargarDatos();
  }
}