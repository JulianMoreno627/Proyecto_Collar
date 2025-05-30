import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../components/models/product.model';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss']
})
export class ProductDetailModalComponent {
  quantity = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private cartService: CartService,
    private authService: AuthService
  ) {}

  addToCart(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.cartService.addToCart(
        currentUser.id, 
        this.data.product.id, 
        this.quantity
      ).subscribe(
        () => {
          // Mostrar notificación de éxito
        },
        error => console.error('Error adding to cart', error)
      );
    } else {
      // Manejar caso cuando el usuario no está autenticado
      console.error('User not authenticated');
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}