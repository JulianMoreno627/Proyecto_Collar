import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../components/models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) { }

  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addToCart(userId: number, productId: number, quantity: number = 1): Observable<CartItem> {
    return this.http.post<CartItem>(
      `${this.apiUrl}/add?userId=${userId}&productId=${productId}&quantity=${quantity}`, 
      {}
    );
  }

  removeFromCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear?userId=${userId}`);
  }
}