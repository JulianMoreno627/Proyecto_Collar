import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import baserUrl from '../services/helper';  // Ajusta la ruta según la ubicación de tu archivo

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${baserUrl}/auth`;
  private currentUsuarioSubject: BehaviorSubject<any>;
  public currentUsuario: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUsuario = localStorage.getItem('currentUsuario');
    this.currentUsuarioSubject = new BehaviorSubject<any>(
      storedUsuario ? JSON.parse(storedUsuario) : null
    );
    this.currentUsuario = this.currentUsuarioSubject.asObservable();
  }

  public get currentUsuarioValue(): any {
    return this.currentUsuarioSubject.value;
  }

  public getCurrentUsuarioId(): number | null {
    return this.currentUsuarioValue?.id || null;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(usuario => {
          localStorage.setItem('currentUsuario', JSON.stringify(usuario));
          this.currentUsuarioSubject.next(usuario);
          return usuario;
        })
      );
  }

  register(usuarioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuarioData);
  }

  logout(): void {
    localStorage.removeItem('currentUsuario');
    this.currentUsuarioSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUsuarioValue;
  }

  isAdmin(): boolean {
    return this.currentUsuarioValue?.rol === 'admin';
  }

  getToken(): string | null {
    return this.currentUsuarioValue?.token || null;
  }
}