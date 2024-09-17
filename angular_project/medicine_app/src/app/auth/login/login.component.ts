import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { patientService } from '../../shared/service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../../shared/service/patient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    fb: FormBuilder,
    private patientService: PatientService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = fb.group({
      mobile: ['', [Validators.pattern('^[0-9]{10}$')]], // Mobile number pattern
      patient_id: ['', [Validators.pattern('^[A-Z0-9]{6,12}$')]] // Alphanumeric patient ID pattern
    }, { validators: this.atLeastOneRequiredValidator }); // Custom validator
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
    let loginInfo = {
      mobile: this.loginForm.get('mobile')?.value,
      patient_id: this.loginForm.get('patient_id')?.value,
    };

    this.patientService.getPatientDetails(loginInfo.mobile, loginInfo.patient_id).subscribe({
      next: (res: any) => {
        console.log('API Response:', res); // Log the response to see its structure

        if (res.token) {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user)); // Ensure `res.user` is set if available
          this.patientService.userStatus.next('loggedIn');

        // Show success snackbar
        this.snackBar.open('Logged in successfully!', 'OK', { duration: 2000 });
        }

      },
      error: (error) => {
        console.error('Login error:', error);
        this.snackBar.open('Failed to login. Please try again.', 'OK',{ duration: 2000 });
      }
    }

  );
  }


}
