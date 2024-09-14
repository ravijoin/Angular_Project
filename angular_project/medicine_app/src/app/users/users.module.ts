import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ApprovalRequestsComponent } from './approval-requests/approval-requests.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [ApprovalRequestsComponent,ViewUsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class UsersModule { }
