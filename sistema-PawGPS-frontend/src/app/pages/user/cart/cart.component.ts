import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../components/models/cart-item.model';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  isLoading = true;
  total = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const userId = this.authService.getCurrentUser()?.id;
    if (userId) {
      this.cartService.getCartItems(userId).subscribe(
        items => {
          this.cartItems = items;
          this.calculateTotal();
          this.isLoading = false;
        },
        error => {
          console.error('Error loading cart', error);
          this.isLoading = false;
        }
      );
    }
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId).subscribe(
      () => {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        this.calculateTotal();
      },
      error => console.error('Error removing item', error)
    );
  }

  clearCart(): void {
    const userId = this.authService.getCurrentUser()?.id;
    if (userId) {
      this.cartService.clearCart(userId).subscribe(
        () => {
          this.cartItems = [];
          this.total = 0;
        },
        error => console.error('Error clearing cart', error)
      );
    }
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity > 0) {
      item.quantity = newQuantity;
      // Aquí deberías llamar a un método de actualización en el servicio
      this.calculateTotal();
    }
  }
}