import { Component, OnInit } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];

  ngOnInit(): void {
    // Datos simulados
    this.users = [
      { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Usuario' },
      { id: 2, name: 'Ana Gómez', email: 'ana@example.com', role: 'Administrador' },
      { id: 3, name: 'Carlos Ruiz', email: 'carlos@example.com', role: 'Usuario' }
    ];
  }

  viewUser(user: User) {
    alert(`Ver usuario: ${user.name}`);
  }

  editUser(user: User) {
    alert(`Editar usuario: ${user.name}`);
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }
}

