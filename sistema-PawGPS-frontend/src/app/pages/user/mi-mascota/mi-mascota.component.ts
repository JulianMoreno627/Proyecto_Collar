// src/app/components/mi-mascota/mi-mascota.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotaService } from 'src/app/services/mascota.service';
import { AuthService } from '../../../services/auth.servece';
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

  constructor(
    private fb: FormBuilder,
    private mascotaService: MascotaService,
    private authService: AuthService,
    private router: Router
  ) {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      color: ['', Validators.required],
      sexo: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    this.cargarMascotas();
  }

  // Función para calcular la edad
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
      
      // Mostrar vista previa
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
      formData.append('mascota', new Blob([JSON.stringify(this.mascotaForm.value)], {
        type: 'application/json'
      }));
      
      if (this.selectedFile) {
        formData.append('foto', this.selectedFile);
      }

      this.mascotaService.registrarMascota(formData).subscribe(
        (response: any) => {
          alert('Mascota registrada con éxito');
          this.mascotaForm.reset();
          this.previewUrl = null;
          this.selectedFile = null;
          this.cargarMascotas();
        },
        error => {
          console.error('Error al registrar mascota:', error);
          alert('Error al registrar mascota');
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
}