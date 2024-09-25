import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../shared/service/patient.service';

@Component({
  selector: 'app-page-thank',
  standalone: false,
  // imports: [],
  templateUrl: './page-thank.component.html',
  styleUrl: './page-thank.component.scss'
})
export class PageThankComponent  {

  constructor(private router: Router,private patientService:PatientService) {}

  // Navigate to the home page when the button is clicked
  goToHome() {
    this.patientService.logOut();
    this.router.navigate(['/login']);
  }
}
