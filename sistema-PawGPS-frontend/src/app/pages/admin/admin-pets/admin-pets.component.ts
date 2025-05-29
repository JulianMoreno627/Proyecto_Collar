import { Component, OnInit } from '@angular/core';
import { MascotaService } from 'src/app/services/mascota.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  editingMascota: any = null;
  mascotaForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private mascotaService: MascotaService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: [''],
      fechaNacimiento: ['', Validators.required],
      color: ['', Validators.required],
      sexo: ['', Validators.required],
      observaciones: ['']
    });
  }

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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  verDetalles(mascota: any): void {
    this.selectedMascota = mascota;
    this.editingMascota = null;
  }

  editarMascota(mascota: any): void {
    this.editingMascota = mascota;
    this.selectedMascota = null;
    this.mascotaForm.patchValue({
      nombre: mascota.nombre,
      especie: mascota.especie,
      raza: mascota.raza,
      fechaNacimiento: mascota.fechaNacimiento.split('T')[0],
      color: mascota.color,
      sexo: mascota.sexo,
      observaciones: mascota.observaciones
    });
    this.previewUrl = mascota.fotoUrl || null;
  }

  actualizarMascota(): void {
    if (this.mascotaForm.valid) {
      const formData = new FormData();
      const mascotaData = this.mascotaForm.value;
      
      formData.append('mascota', JSON.stringify(mascotaData));
      
      if (this.selectedFile) {
        formData.append('foto', this.selectedFile);
      }

      this.mascotaService.actualizarMascota(this.editingMascota.id, formData).subscribe(
        (response: any) => {
          alert('Mascota actualizada con éxito');
          this.cancelarEdicion();
          this.cargarDatos();
        },
        error => {
          console.error('Error al actualizar mascota:', error);
          alert('Error al actualizar mascota');
        }
      );
    }
  }

  eliminarMascota(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta mascota?')) {
      this.mascotaService.eliminarMascota(id).subscribe(
        () => {
          this.cargarDatos();
          this.selectedMascota = null;
          this.editingMascota = null;
        },
        error => {
          console.error('Error al eliminar mascota:', error);
          alert('Error al eliminar mascota');
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.editingMascota = null;
    this.mascotaForm.reset();
    this.previewUrl = null;
    this.selectedFile = null;
  }

  cerrarDetalles(): void {
    this.selectedMascota = null;
  }

  refrescar(): void {
    this.cargarDatos();
  }
}
