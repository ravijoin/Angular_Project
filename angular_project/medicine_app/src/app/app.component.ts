import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './shared/service/api.service';
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PatientService } from './shared/service/patient.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule,AuthModule,DashboardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Medicine App';

  constructor(private apiService: PatientService) {}

  ngOnInit(): void {
    let status = this.apiService.isLoggedIn() ? 'loggedIn' : 'loggedOff';
    this.apiService.userStatus.next(status);
  }

}
