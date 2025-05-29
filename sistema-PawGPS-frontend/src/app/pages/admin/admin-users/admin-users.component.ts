import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  usuarios: any[] = [];
  totalUsuarios: number = 0;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  selectedUsuario: any = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.userService.obtenerTodosUsuarios().subscribe(
      (data: any) => {
        this.usuarios = data;
        this.cargarTotalUsuarios();
      },
      error => {
        console.error('Error al cargar usuarios:', error);
        this.errorMessage = 'Error al cargar la lista de usuarios';
        this.isLoading = false;
      }
    );
  }

  cargarTotalUsuarios(): void {
    this.userService.contarUsuarios().subscribe(
      (total: number) => {
        this.totalUsuarios = total;
        this.isLoading = false;
      },
      error => {
        console.error('Error al contar usuarios:', error);
        this.errorMessage = 'Error al cargar el total de usuarios';
        this.isLoading = false;
      }
    );
  }

  verDetalles(usuario: any): void {
    this.selectedUsuario = usuario;
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario? Esta acción es permanente y no podrá volver a ingresar.')) {
      this.userService.eliminarUsuario(id).subscribe(
        () => {
          this.cargarDatos();
          this.selectedUsuario = null;
        },
        error => {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar usuario');
        }
      );
    }
  }

  cerrarDetalles(): void {
    this.selectedUsuario = null;
  }

  refrescar(): void {
    this.cargarDatos();
  }
}
