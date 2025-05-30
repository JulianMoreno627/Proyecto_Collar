// src/app/components/mis-dispositivos/mis-dispositivos.component.ts
import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../../../services/dispositivo.service';

@Component({
  selector: 'app-mis-dispositivos',
  templateUrl: './mis-dispositivos.component.html',
  styleUrls: ['./mis-dispositivos.component.css']
})
export class MisDispositivosComponent implements OnInit {
  dispositivos: any[] = [];
  isLoading: boolean = true;

  constructor(private dispositivoService: DispositivoService) { }

  ngOnInit(): void {
    this.cargarMisDispositivos();
  }

  cargarMisDispositivos(): void {
    this.dispositivoService.obtenerMisDispositivos().subscribe(
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
}
