import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  products: Product[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simulación de datos de la API
    this.products = [
      {
        id: 1,
        name: 'Collar GPS para perros',
        description: 'Localiza a tu mascota en tiempo real',
        image: 'https://via.placeholder.com/300x200?text=Collar+GPS'
      },
      {
        id: 2,
        name: 'Comedero automático',
        description: 'Programa las comidas de tu mascota',
        image: 'https://via.placeholder.com/300x200?text=Comedero+Automático'
      },
      {
        id: 3,
        name: 'Arnés reflectante',
        description: 'Seguridad para paseos nocturnos',
        image: 'https://via.placeholder.com/300x200?text=Arnés+Reflectante'
      },
      {
        id: 4,
        name: 'Juguete mordedor',
        description: 'Diversión y cuidado dental',
        image: 'https://via.placeholder.com/300x200?text=Juguete+Mordedor'
      },
      {
        id: 5,
        name: 'Cama ortopédica',
        description: 'Comodidad para mascotas mayores',
        image: 'https://via.placeholder.com/300x200?text=Cama+Ortopédica'
      },
      {
        id: 6,
        name: 'Shampoo natural',
        description: 'Cuidado suave para la piel',
        image: 'https://via.placeholder.com/300x200?text=Shampoo+Natural'
      }
    ];
  }
}


  