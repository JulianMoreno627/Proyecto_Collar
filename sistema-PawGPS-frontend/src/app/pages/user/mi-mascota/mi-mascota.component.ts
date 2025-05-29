import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotaService } from 'src/app/services/mascota.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-mascota',
  templateUrl: './mi-mascota.component.html',
  styleUrls: ['./mi-mascota.component.css']
})
export class MiMascotaComponent implements OnInit {
  mascotaForm: FormGroup;
  mascotas: any[] = [];
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  editingMascota: any = null;

  constructor(
    private fb: FormBuilder,
    private mascotaService: MascotaService,
    private authService: AuthService,
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
      },
      error => {
        console.error('Error al cargar mascotas:', error);
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

  onSubmit(): void {
    if (this.mascotaForm.valid) {
      const formData = new FormData();
      const mascotaData = this.mascotaForm.value;
      
      // Añadir mascota como JSON string en formData
      formData.append('mascota', JSON.stringify(mascotaData));
      
      // Adjuntar la foto si hay
      if (this.selectedFile) {
        formData.append('foto', this.selectedFile);
      }

      if (this.editingMascota) {
        // Editar mascota existente
        this.mascotaService.actualizarMascota(this.editingMascota.id, formData).subscribe(
          (response: any) => {
            alert('Mascota actualizada con éxito');
            this.resetForm();
            this.cargarMascotas();
          },
          error => {
            console.error('Error al actualizar mascota:', error);
            alert('Error al actualizar mascota');
          }
        );
      } else {
        // Crear nueva mascota
        this.mascotaService.registrarMascota(formData).subscribe(
          (response: any) => {
            alert('Mascota registrada con éxito');
            this.resetForm();
            this.cargarMascotas();
          },
          error => {
            console.error('Error al registrar mascota:', error);
            alert('Error al registrar mascota');
          }
        );
      }
    }
  }

  editarMascota(mascota: any): void {
    this.editingMascota = mascota;
    this.mascotaForm.patchValue({
      nombre: mascota.nombre,
      especie: mascota.especie,
      raza: mascota.raza,
      fechaNacimiento: mascota.fechaNacimiento ? mascota.fechaNacimiento.split('T')[0] : '', // formato yyyy-MM-dd
      color: mascota.color,
      sexo: mascota.sexo,
      observaciones: mascota.observaciones
    });
    this.previewUrl = mascota.fotoUrl || null;
    this.selectedFile = null; // reset selected file al editar
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    this.resetForm();
  }

  resetForm(): void {
    this.mascotaForm.reset();
    this.previewUrl = null;
    this.selectedFile = null;
    this.editingMascota = null;
  }
}
