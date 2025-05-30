import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from '../../../components/models/usuario.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  usuarios: Usuario[] = [];
  totalUsuarios: number = 0;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  selectedUsuario: Usuario | null = null;
  deleteInProgress: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.userService.obtenerTodosUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
        this.cargarTotalUsuarios();
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.errorMessage = this.getErrorMessage(error);
        this.isLoading = false;
      }
    });
  }

  cargarTotalUsuarios(): void {
    this.userService.contarUsuarios().subscribe({
      next: (total: number) => {
        this.totalUsuarios = total;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al contar usuarios:', error);
        this.errorMessage = 'Error al cargar el total de usuarios';
        this.isLoading = false;
      }
    });
  }

  verDetalles(usuario: Usuario): void {
    this.selectedUsuario = usuario;
  }

  eliminarUsuario(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este usuario?\nEsta acción es irreversible.')) {
      return;
    }

    this.deleteInProgress = true;
    
    this.userService.eliminarUsuario(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
        this.totalUsuarios--;
        this.selectedUsuario = null;
        this.deleteInProgress = false;
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
        this.errorMessage = this.getErrorMessage(error, 'eliminar');
        this.deleteInProgress = false;
      }
    });
  }

  cerrarDetalles(): void {
    this.selectedUsuario = null;
  }

  refrescar(): void {
    this.cargarDatos();
  }

  private getErrorMessage(error: any, action: string = 'cargar'): string {
    if (error.status === 403) {
      return 'No tienes permisos para realizar esta acción';
    }
    if (error.status === 404) {
      return 'Recurso no encontrado';
    }
    return `Error al ${action} los usuarios. Intente nuevamente más tarde.`;
  }

  trackByUsuarioId(index: number, usuario: Usuario): number {
    return usuario.id;
  }
}
