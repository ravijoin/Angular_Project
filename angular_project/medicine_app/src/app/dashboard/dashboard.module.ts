import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '../material/material.module';
import { MedicineNameComponent } from './medicine-name/medicine-name.component';
import { MedicineMaintainanceComponent } from './medicine-maintainance/medicine-maintainance.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ViewMedicineComponent } from './view-medicine/view-medicine.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { OrderCheckoutComponent } from './order-checkout/order-checkout.component';
import { PageThankComponent } from './page-thank/page-thank.component';
import { ViewCartComponent } from './view-cart/view-cart.component';

@NgModule({
  declarations: [
    MedicineNameComponent,
    MedicineMaintainanceComponent,
    PlaceOrderComponent,
    ViewMedicineComponent,
    ViewOrdersComponent,
    OrderCheckoutComponent,
    PageThankComponent,
    ViewCartComponent
  ],
  imports: [CommonModule, SharedModule, MaterialModule],
})
export class DashboardModule {}
