import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
// import { patientService } from '../../shared/service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../../shared/service/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;
  isLoading = false;

  constructor(
    fb: FormBuilder,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private router: Router // Inject the Router service
  ) {
    this.loginForm = fb.group(
      {
        mobile: ['', [Validators.pattern('^[0-9]{10}$')]], // Mobile number pattern for exactly 10 digits
        patient_id: ['', [Validators.pattern('^[A-Za-z0-9=]+$')]], // Alphanumeric pattern with support for '='
      },
      { validators: this.atLeastOneRequiredValidator }
    ); // Custom validator
  }
  // Custom validator to check if at least one field is filled
  atLeastOneRequiredValidator(control: AbstractControl) {
    const mobile = control.get('mobile')?.value;
    const patient_id = control.get('patient_id')?.value;

    if (!mobile && !patient_id) {
      return { atLeastOneRequired: true };
    }
    return null;
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const mobile = this.loginForm.get('mobile')?.value;
      const patient_id = this.loginForm.get('patient_id')?.value;

      // Debugging - check the form values
      console.log('Form values:', { mobile, patient_id });

      // Check if both fields are filled
      if (mobile && patient_id) {
        this.snackBar.open(
          'Please provide only one field: mobile or patient ID.',
          'OK',
          {
            duration: 4000,
          }
        );
        return; // Exit the function early
      }

      // Make API call
      this.patientService.getPatientDetails(patient_id, mobile).subscribe({
        next: (response) => {
          if (response.status_code === '1') {
            this.snackBar.open('Login Successful', 'OK', { duration: 4000 });

            // If the login is successful, store the API key in localStorage
            this.patientService.storeApiKey('wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3'); // Store API key

            // Navigate to the dashboard after successful login
            setTimeout(() => {
              this.router.navigate(['/dashboard/search-medicine']);
            }, 4000);
          } else {
            this.snackBar.open(response.status_message, 'OK', {
              duration: 4000,
            });
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.snackBar.open(error.message, 'OK', { duration: 4000 });
        },
      });
    } else {
      this.snackBar.open('Please fill the form correctly.', 'OK', {
        duration: 4000,
      });
    }
  }
}
