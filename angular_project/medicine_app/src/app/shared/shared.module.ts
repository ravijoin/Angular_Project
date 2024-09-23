import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { PageSideNavBarComponent } from './components/page-side-nav-bar/page-side-nav-bar.component';
;


@NgModule({
  declarations: [
    PageHeaderComponent,
    PageFooterComponent,
    PageSideNavBarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,

  ],
  exports: [
    CommonModule,
    MaterialModule,
    PageHeaderComponent,
    PageFooterComponent,
    PageSideNavBarComponent,
    RouterModule,
    ReactiveFormsModule,

  ],
})
export class SharedModule {}
