import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { CarritoComponent } from './pages/user/carrito/carrito.component';
import { MiMascotaComponent } from './pages/user/mi-mascota/mi-mascota.component';
import { ProductosComponent } from './pages/user/productos/productos.component';
import { RastreoComponent } from './pages/user/rastreo/rastreo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminPetsComponent } from './pages/admin/admin-pets/admin-pets.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminDevicesComponent } from './pages/admin/admin-devices/admin-devices.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { MisMascotasComponent } from './pages/user/mis-mascotas/mis-mascotas.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    CarritoComponent,
    MiMascotaComponent,
    ProductosComponent,
    RastreoComponent,
    AdminUsersComponent,
    AdminPetsComponent,
    AdminProductsComponent,
    AdminDevicesComponent,
    AdminOrdersComponent,
    MisMascotasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
