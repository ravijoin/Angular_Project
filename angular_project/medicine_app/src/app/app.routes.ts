import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MedicineNameComponent } from './dashboard/medicine-name/medicine-name.component';
import { PlaceOrderComponent } from './dashboard/place-order/place-order.component';
import { ProfileComponent } from './users/profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: MedicineNameComponent },
  { path: 'dashboard/orders', component: PlaceOrderComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: LoginComponent },
];
