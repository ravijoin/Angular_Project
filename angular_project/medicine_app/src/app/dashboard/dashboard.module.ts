import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { MaterialModule } from '../material/material.module';
import { MedicineNameComponent } from './medicine-name/medicine-name.component';
import { MedicineMaintainanceComponent } from './medicine-maintainance/medicine-maintainance.component';
import { PlaceOrderComponent } from './place-order/place-order.component';





@NgModule({
  declarations: [MedicineNameComponent,MedicineMaintainanceComponent, PlaceOrderComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class DashboardModule { }
