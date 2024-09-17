import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { UserType } from '../../../models/models';
import { PatientService } from '../../service/patient.service';

export interface NavigationItem {
  value: string;
  link: string;
}
@Component({
  selector: 'app-page-side-nav-bar',
  templateUrl: './page-side-nav-bar.component.html',
  styleUrl: './page-side-nav-bar.component.scss',
})
export class PageSideNavBarComponent {
  panelName: string = '';
  navItems: { value: string; link: string }[] = [];

  constructor(private patientService: PatientService, private router: Router) {
    this.patientService.userStatus.subscribe({
      next: (status) => {
        if (status === 'loggedIn') {
          router.navigateByUrl('/dashboard');
          let user = this.patientService.getUserInfo();

          if (user) {
            // Proceed with handling user based on userType
            if (user.userType === UserType.ADMIN) {
              this.panelName = 'Admin Panel';
              this.navItems = [
                { value: 'View Books', link: '/dashboard' },
                // Add more items for admin
              ];
            } else if (user.userType === UserType.STUDENT) {
              this.panelName = 'Student Panel';
              this.navItems = [
                { value: 'View Books', link: '/dashboard' },
                { value: 'My Orders', link: '/my-orders' },
              ];
            }
          } else {
            // Handle case where user info is null
            // console.log('User info is null.');
            // router.navigateByUrl('/login');
          }
        }
        else if (status === 'loggedOff') {
          this.panelName = 'Patient Panel';
          router.navigateByUrl('/login');
          this.navItems = [{ value: 'View Medicines', link: '/dashboard' }];
        }
      },
    });
  }
}
