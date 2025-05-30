import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../components/models/usuario.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registroForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.registroForm.controls;
  }

  formSubmit(): void {
    if (this.registroForm.invalid) {
      this.mostrarError('Por favor complete todos los campos requeridos correctamente');
      return;
    }

    this.isLoading = true;
    const usuario: Usuario = this.registroForm.value;

    this.userService.añadirUsuario(usuario).subscribe({
      next: (data) => {
        this.isLoading = false;
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Usuario registrado con éxito en el sistema',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error en registro:', error);
        let errorMsg = 'Ha ocurrido un error en el sistema';
        
        if (error.error && error.error.message) {
          errorMsg = error.error.message;
        } else if (error.status === 409) {
          errorMsg = 'El nombre de usuario o email ya existe';
        }

        this.mostrarError(errorMsg);
      }
    });
  }

  private mostrarError(mensaje: string): void {
    this.snack.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}
