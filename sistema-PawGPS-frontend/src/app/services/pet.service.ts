import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from '../services/helper'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = `${baserUrl}/pets`;

  constructor(private http: HttpClient) { }

  uploadPhoto(photo: FormData) {
    return this.http.post(`${this.apiUrl}/upload-photo`, photo);
  }

  registerPet(petData: any) {
    return this.http.post(this.apiUrl, petData);
  }

  getUserPets(usuarioId: number) {
    return this.http.get(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}