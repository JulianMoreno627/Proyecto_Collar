// src/app/components/admin-devices/admin-devices.component.ts
import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../../../services/dispositivo.service';

@Component({
  selector: 'app-admin-devices',
  templateUrl: './admin-devices.component.html',
  styleUrls: ['./admin-devices.component.css']
})
export class AdminDevicesComponent implements OnInit {
  dispositivos: any[] = [];
  totalDispositivos: number = 0;
  isLoading: boolean = true;

  constructor(private dispositivoService: DispositivoService) {}

  ngOnInit(): void {
    this.cargarDispositivos();
    this.contarDispositivos();
  }

  cargarDispositivos(): void {
    this.dispositivoService.obtenerTodosDispositivos().subscribe(
      (data: any) => {
        this.dispositivos = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error al cargar dispositivos:', error);
        this.isLoading = false;
      }
    );
  }

  contarDispositivos(): void {
    this.dispositivoService.contarDispositivosActivos().subscribe(
      (total: number) => {
        this.totalDispositivos = total;
      },
      error => {
        console.error('Error al contar dispositivos:', error);
      }
    );
  }

  eliminarDispositivo(id: number): void {
    if (confirm('¿Estás seguro de eliminar este dispositivo?')) {
      this.dispositivoService.eliminarDispositivo(id).subscribe(
        () => {
          this.cargarDispositivos();
          this.contarDispositivos();
        },
        error => {
          console.error('Error al eliminar dispositivo:', error);
        }
      );
    }
  }
}

