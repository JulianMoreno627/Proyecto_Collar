import { Component, OnInit } from '@angular/core';
import { Product } from '../../../components/models/product.model';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from '../../../components/image-modal/image-modal.component'; // Componente modal personalizado

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isAdmin = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
    this.checkAdminRole();
  }

  private async checkAdminRole(): Promise<void> {
    this.isAdmin = await this.authService.hasRole('ADMIN').toPromise();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  openImageModal(imageUrl: string): void {
    const modalRef = this.modalService.open(ImageModalComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.imageUrl = imageUrl;
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId).subscribe({
      next: () => {
        // Mostrar notificación de éxito
        console.log('Product added to cart');
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
      }
    });
  }
}