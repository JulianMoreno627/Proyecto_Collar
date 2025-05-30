export interface Usuario {
  id: number;
  username: string;
  password?: string; // El ? indica que es opcional
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  enabled: boolean;
  perfil: string;
  roles?: string[]; 
   fechaRegistro: Date | string;
}

// Si necesitas tipos específicos para los roles
export type RolUsuario = 'ADMIN' | 'NORMAL' | 'EDITOR'; // Ajusta según tus necesidades