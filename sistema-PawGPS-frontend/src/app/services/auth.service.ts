import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import baserUrl from './helper';

interface Usuario {
  id: number;
  email: string;
  nombre: string;
  rol: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${baserUrl}/auth`;
  private currentUsuarioSubject: BehaviorSubject<Usuario | null>;
  public currentUsuario: Observable<Usuario | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUsuario = this.getStoredUsuario();
    this.currentUsuarioSubject = new BehaviorSubject<Usuario | null>(storedUsuario);
    this.currentUsuario = this.currentUsuarioSubject.asObservable();
  }

  private getStoredUsuario(): Usuario | null {
    try {
      const usuarioStr = localStorage.getItem('currentUsuario');
      return usuarioStr ? JSON.parse(usuarioStr) : null;
    } catch (error) {
      console.error('Error parsing stored user', error);
      this.clearStorage();
      return null;
    }
  }

  public get currentUsuarioValue(): Usuario | null {
    return this.currentUsuarioSubject.value;
  }

  public getCurrentUsuarioId(): number | null {
    return this.currentUsuarioValue?.id ?? null;
  }

  login(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(usuario => {
          this.storeUsuario(usuario);
          this.currentUsuarioSubject.next(usuario);
        }),
        catchError(error => {
          console.error('Login error', error);
          return throwError(() => new Error('Credenciales incorrectas'));
        })
      );
  }

  register(usuarioData: any): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/register`, usuarioData)
      .pipe(
        catchError(error => {
          console.error('Registration error', error);
          return throwError(() => new Error('Error en el registro'));
        })
      );
  }

  logout(): void {
    this.clearStorage();
    this.currentUsuarioSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUsuarioValue?.token;
  }

  isAdmin(): boolean {
    return this.currentUsuarioValue?.rol === 'admin';
  }

  getToken(): string | null {
    return this.currentUsuarioValue?.token ?? null;
  }

  private storeUsuario(usuario: Usuario): void {
    try {
      localStorage.setItem('currentUsuario', JSON.stringify(usuario));
    } catch (error) {
      console.error('Error storing user', error);
    }
  }

  private clearStorage(): void {
    try {
      localStorage.removeItem('currentUsuario');
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  }
}