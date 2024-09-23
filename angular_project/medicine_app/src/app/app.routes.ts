import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MedicineNameComponent } from './dashboard/medicine-name/medicine-name.component';
import { PlaceOrderComponent } from './dashboard/place-order/place-order.component';
import { ProfileComponent } from './users/profile/profile.component';
import { ViewMedicineComponent } from './dashboard/view-medicine/view-medicine.component';
import { ViewOrdersComponent } from './dashboard/view-orders/view-orders.component';
import { OrderCheckoutComponent } from './dashboard/order-checkout/order-checkout.component';
import { PageThankComponent } from './dashboard/page-thank/page-thank.component';
import { ViewCartComponent } from './dashboard/view-cart/view-cart.component';
import { authGuard } from '../auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/view-cart', component: ViewCartComponent, canActivate: [authGuard] },  // Protect cart route
  { path: 'dashboard/search-medicine', component: MedicineNameComponent, canActivate: [authGuard] },
  { path: 'dashboard/view-medicineById', component: ViewMedicineComponent, canActivate: [authGuard] },
  { path: 'dashboard/place-orders', component: PlaceOrderComponent, canActivate: [authGuard] },
  { path: 'dashboard/order-checkout', component: OrderCheckoutComponent, canActivate: [authGuard] },
  { path: 'dashboard/thankyou', component: PageThankComponent, canActivate: [authGuard] },
  // { path: 'dashboard/orders/view', component: ViewOrdersComponent },

  { path: 'profile', component: ProfileComponent },
  { path: '**', component: LoginComponent },
];
