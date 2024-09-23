import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ApiService } from './shared/service/api.service';
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PatientService } from './shared/service/patient.service';
import { MatSidenavContent } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule,AuthModule,DashboardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit{
  @ViewChild(MatSidenavContent, { static: true }) matSidenavContent!: MatSidenavContent;
  showScrollToTop: boolean = false;  // Control visibility of the scroll-to-top button

  constructor(private router: Router) {
    // Listen for route changes to scroll to top
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();  // Automatically scroll to top on route change
      }
    });
  }

  // Method to scroll to top
  scrollToTop() {
    if (this.matSidenavContent) {
      this.matSidenavContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Listen for scroll event on MatSidenavContent instead of the window
  ngAfterViewInit() {
    this.matSidenavContent.elementScrolled().subscribe(() => {
      const scrollPosition = this.matSidenavContent.getElementRef().nativeElement.scrollTop;
      if (scrollPosition >= 100) {
        this.showScrollToTop = true;  // Show the button when scrolled down 100px
      } else {
        this.showScrollToTop = false; // Hide the button when scrolled back up
      }
    });
  }
}
