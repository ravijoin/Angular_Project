import { Component, OnInit } from '@angular/core';
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
export class PageSideNavBarComponent implements OnInit {
  panelName: string = 'Patient Panel';
  navItems: { value: string; link: string }[] = [];

  constructor(private patientService: PatientService, private router: Router) {

}
ngOnInit(): void {
  this.patientService.userStatus.subscribe({
    next: (status) => {
      if (status === 'loggedIn') {
        this.router.navigateByUrl('/home');

        // Static name for the panel
        this.panelName = 'Patient Panel';

        // Static navigation items
        this.navItems = [
          { value: 'View Medicines', link: '/home' }, // Single option for patient
        ];

      } else if (status === 'loggedOff') {
        this.panelName = 'Patient Panel'; // Set the panel name even when logged off
        this.router.navigateByUrl('/login');
        this.navItems = [];
      }
    },
  });
}
}
