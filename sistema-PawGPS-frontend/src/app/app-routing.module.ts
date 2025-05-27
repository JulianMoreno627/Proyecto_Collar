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
import { RastreoComponent } from './pages/user/rastreo/rastreo.component';
import { CarritoComponent } from './pages/user/carrito/carrito.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    pathMatch : 'full'
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
    pathMatch : 'full'
  },
  {
    path:'admin',
    component:DashboardComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    pathMatch:'full',
    canActivate:[NormalGuard]
  },
  {
    path: 'productos',
    component: ProductosComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  },
  {
    path: 'mi-mascota',
    component: MiMascotaComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  },
  {
    path: 'rastreo',
    component: RastreoComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  },
  {
    path: 'carrito',
    component: CarritoComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
