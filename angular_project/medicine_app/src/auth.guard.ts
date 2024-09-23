import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from './app/shared/service/api.service';
import { inject } from '@angular/core';
import { PatientService } from './app/shared/service/patient.service';

export const authGuard: CanActivateFn = (route, state) => {
  const patientService = inject(PatientService);  // Inject ApiService
  const router = inject(Router);  // Inject Router

  if (patientService.isLoggedIn()) {
    return true;  // Allow access if logged in
  } else {
    router.navigate(['/login']);  // Redirect to login page if not logged in
    return false;  // Block access
  }

};
