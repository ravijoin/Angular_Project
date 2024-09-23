import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../../shared/service/patient.service';
import { RegisterResponse } from '../../models/models';
import { Router } from '@angular/router';


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
    private router:Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]], // Only letters
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],  // Only letters
      dob: ['', [Validators.required, this.dateValidator]], // YYYY-MM-DD format
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10 digits
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], // 5 digits
      gender: ['', [Validators.required, Validators.pattern('^(male|female|other)$')]], // Specific values
      blood_group: ['', [Validators.required, Validators.pattern('^(A|B|AB|O)[+-]$')]] // Blood group pattern
    });
  }
  // Custom date validator
dateValidator(control: AbstractControl): { [key: string]: any } | null {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const isValidDate = datePattern.test(control.value);
  if (!isValidDate) {
    return { invalidDate: { value: control.value } }; // Return error if date is invalid
  }
  const date = new Date(control.value);
  // Check if the constructed date is valid (handles cases like 1999-20-01)
  if (date.getFullYear() !== parseInt(control.value.split('-')[0], 10) ||
      date.getMonth() + 1 !== parseInt(control.value.split('-')[1], 10) ||
      date.getDate() !== parseInt(control.value.split('-')[2], 10)) {
    return { invalidDate: { value: control.value } }; // Return error for invalid date
  }
  return null; // Return null if the date is valid
}

  register() {
    if (this.registerForm.valid) {
      this.patientService.addPatient(this.registerForm.value).subscribe({
        next: (response: RegisterResponse) => { // Assuming 'RegisterResponse' is your response interface
          // Check the status code in the response
          if (response.status_code === '0') {
            // Show error message if mobile already exists or another issue
            this.snackBar.open(response.status_message, 'OK', { duration: 4000 });
          } else {
            // Handle successful registration
            console.log('Registration Response:', response);
            this.snackBar.open('Patient registered successfully!', 'OK', { duration: 4000 });
           this.router.navigate(['login'])
          }
        },
        error: (error) => {
          // Handle error response from the API
          this.snackBar.open('Failed to register patient. Please try again.', 'OK', { duration: 4000 });
          console.error('Registration error:', error);
        }
      });
    } else {
      // Form is invalid, show error snackbar
      this.snackBar.open('Please fill all required fields correctly.', 'OK', { duration: 4000 });
    }
  }




}
