import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotaService } from '../../../services/mascota.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-mascotas',
  templateUrl: './mis-mascotas.component.html',
  styleUrls: ['./mis-mascotas.component.css']
})
export class MisMascotasComponent implements OnInit {
  mascotas: any[] = [];
  mascotaForm: FormGroup;
  editingMascota: any = null;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isLoading: boolean = true;

  constructor(
    private mascotaService: MascotaService,
    private fb: FormBuilder,
    private router: Router
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
    this.cargarMascotas();
  }

  cargarMascotas(): void {
    this.mascotaService.obtenerMisMascotas().subscribe(
      (data: any) => {
        this.mascotas = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error al cargar mascotas:', error);
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

  editarMascota(mascota: any): void {
    this.editingMascota = mascota;
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
          this.cargarMascotas();
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
          alert('Mascota eliminada con éxito');
          this.cargarMascotas();
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

  calcularEdad(fechaNacimiento: string): number {
    if (!fechaNacimiento) return 0;
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  }
}