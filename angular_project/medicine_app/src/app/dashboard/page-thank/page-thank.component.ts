import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-thank',
  standalone: false,
  // imports: [],
  templateUrl: './page-thank.component.html',
  styleUrl: './page-thank.component.scss'
})
export class PageThankComponent  {

  constructor(private router: Router) {}

  // Navigate to the home page when the button is clicked
  goToHome() {
    this.router.navigate(['/home']);
  }
}
