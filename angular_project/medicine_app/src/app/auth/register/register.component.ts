import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../../shared/service/patient.service';
import { RegisterResponse } from '../../models/models';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hidePwdContent: boolean = true;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService:PatientService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]], // Only letters
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],  // Only letters
      dob: ['', [Validators.required, Validators.pattern('^\\d{4}-\\d{2}-\\d{2}$')]], // YYYY-MM-DD format
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10 digits
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]], // 5 digits
      gender: ['', [Validators.required, Validators.pattern('^(Male|Female|Other)$')]], // Specific values
      blood_group: ['', [Validators.required, Validators.pattern('^(A|B|AB|O)[+-]$')]] // Blood group pattern
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.patientService.addPatient(this.registerForm.value).subscribe({
        next: (response: RegisterResponse) => { // Explicitly type the response here
          // Check if response contains a token
          console.log('Registration Response:', response);
          if (response && response.token) {
            // Store the token in localStorage
            localStorage.setItem('access_token', response.token);

            // Show success message
            this.snackBar.open('Patient registered successfully!', 'OK', { duration: 2000 });


          } else {
            this.snackBar.open('Patient registered successfully, but no token received!', 'OK', { duration: 2000 });
          }
        },
        error: (error) => {
          this.snackBar.open('Failed to register patient. Please try again.', 'OK', { duration: 2000 });
          console.error('Registration error:', error);
        }
      });
    } else {
      this.snackBar.open('Please fill all required fields correctly.', 'OK', { duration: 2000 });
    }
  }



}
