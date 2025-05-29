import { Component, OnInit } from '@angular/core';
import { MascotaService } from 'src/app/services/mascota.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pets',
  templateUrl: './admin-pets.component.html',
  styleUrls: ['./admin-pets.component.css']
})
export class AdminPetsComponent implements OnInit {
  mascotas: any[] = [];
  totalMascotas: number = 0;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  selectedMascota: any = null;

  constructor(
    private mascotaService: MascotaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.mascotaService.obtenerTodasMascotas().subscribe(
      (data: any) => {
        this.mascotas = data;
        this.cargarTotalMascotas();
      },
      error => {
        console.error('Error al cargar mascotas:', error);
        this.errorMessage = 'Error al cargar la lista de mascotas';
        this.isLoading = false;
      }
    );
  }

  cargarTotalMascotas(): void {
    this.mascotaService.contarMascotas().subscribe(
      (total: number) => {
        this.totalMascotas = total;
        this.isLoading = false;
      },
      error => {
        console.error('Error al contar mascotas:', error);
        this.errorMessage = 'Error al cargar el total de mascotas';
        this.isLoading = false;
      }
    );
  }

  verDetalles(mascota: any): void {
    this.selectedMascota = mascota;
  }

  eliminarMascota(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta mascota?')) {
      this.mascotaService.eliminarMascota(id).subscribe(
        () => {
          this.cargarDatos();
        },
        error => {
          console.error('Error al eliminar mascota:', error);
          alert('Error al eliminar mascota');
        }
      );
    }
  }

  cerrarDetalles(): void {
    this.selectedMascota = null;
  }

  // Método agregado para refrescar los datos al hacer click en los botones de refrescar
  refrescar(): void {
    this.cargarDatos();
  }
}


