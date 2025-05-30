import { Component, OnInit } from '@angular/core';
import { Product } from '../../components/models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService, // Cambiado a public para usar en el template
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading products', error);
        this.isLoading = false;
      }
    );
  }

  openProductDetail(product: Product): void {
    this.dialog.open(ProductDetailModalComponent, {
      width: '800px',
      data: { product }
    });
  }

  addToCart(productId: number): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.cartService.addToCart(currentUser.id, productId).subscribe(
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
}