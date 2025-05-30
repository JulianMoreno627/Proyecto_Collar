import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './pages/user/productos/productos.component';
import { MiMascotaComponent } from './pages/user/mi-mascota/mi-mascota.component';
import { CarritoComponent } from './pages/user/carrito/carrito.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminPetsComponent } from './pages/admin/admin-pets/admin-pets.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminDevicesComponent } from './pages/admin/admin-devices/admin-devices.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { MisMascotasComponent } from './pages/user/mis-mascotas/mis-mascotas.component';
import { AdminTrackingComponent } from './pages/admin/admin-tracking/admin-tracking.component';
import { TrackerComponent } from './pages/user/tracker/tracker.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard]
  },
  {
    path: 'mi-mascota',
    component: MiMascotaComponent,
    canActivate: [NormalGuard]
  },
  {
    path: 'mis-mascotas',
    component: MisMascotasComponent,
    canActivate: [NormalGuard]
  },

  {
    path: 'tracker',
    component: TrackerComponent,
    canActivate: [NormalGuard]
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'pets',
        component: AdminPetsComponent
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

