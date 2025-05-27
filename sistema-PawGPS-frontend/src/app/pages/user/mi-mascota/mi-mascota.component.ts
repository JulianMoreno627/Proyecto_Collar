import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mi-mascota',
  templateUrl: './mi-mascota.component.html',
  styleUrls: ['./mi-mascota.component.css']
})
export class MiMascotaComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  previewUrl: string | ArrayBuffer | null = null;
  
  petForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.petForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      breed: ['', Validators.required],
      birthDate: ['', Validators.required],
      color: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0.1)]],
      gender: ['', Validators.required]
    });
  }

  // Activa el input file cuando se hace clic en el círculo
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Maneja la selección de archivo
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Envía el formulario
  onSubmit(): void {
    if (this.petForm.valid && this.previewUrl) {
      const formData = {
        ...this.petForm.value,
        photo: this.previewUrl
      };
      console.log('Datos de la mascota:', formData);
      // Aquí iría la lógica para enviar al backend
      alert('Mascota registrada con éxito!');
      this.petForm.reset();
      this.previewUrl = null;
    }
  }
}