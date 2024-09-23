import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { RegisterComponent } from '../../auth/register/register.component';
import { Observable, Subject, tap } from 'rxjs';
import { RegisterResponse, User } from '../../models/models';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrlAdd = 'https://dev-api.evitalrx.in/v1/fulfillment/patients/add';
  private baseUrlView = 'https://dev-api.evitalrx.in/v1/fulfillment/patients/view';
  private apikey = "wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3";

  userStatus: Subject<string> = new Subject();

  constructor(private http: HttpClient,private cartService:CartService) { }

  getPatientDetails(patientId?: string, mobile?: string) {
    // Check if at least one of the fields is provided
    if (!patientId && !mobile) {
      console.error('Both patient ID and mobile number are missing.');
      return throwError(() => new Error('Please provide either Mobile Number or Patient ID.'));
    }

    let body: Record<string, any> = {};

    // Only add `patient_id` if it's provided
    if (patientId) {
      body['patient_id'] = patientId;
    }

    // Only add `mobile` if it's provided
    if (mobile) {
      body['mobile'] = mobile;
    }


    // Always add `apikey` (assuming you always need to include the API key)
    body['apikey'] = this.apikey;

    console.log('Request Body:', body);


    // Remove undefined keys from the request body
    Object.keys(body).forEach(key => {
      if (body[key] === undefined) {
        delete body[key];
      }
    });




    return this.http.post<any>(this.baseUrlView, body).pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error fetching patient details:', error);
        return throwError(() => new Error('Error fetching patient details.'));
      })
    );
  }


  addPatient(patientData: any): Observable<RegisterResponse> {

    patientData['apikey'] = this.apikey;
    return this.http.post<RegisterResponse>(this.baseUrlAdd, patientData,)  // Explicitly type the response here
      .pipe(
        catchError(error => {
          console.error('Error adding patient:', error);
          return throwError(error);
        })
      );
  }
   // Store API key in localStorage after successful login
   storeApiKey(apiKey: string) {
    localStorage.setItem('apikey', apiKey);
  }

  // Retrieve API key from localStorage
  getApiKey(): string | null {
    return localStorage.getItem('apikey');
  }

// Check if the user is logged in (check if API key exists)
isLoggedIn(): boolean {
  return this.getApiKey() != null;
}

// Fetch user info from localStorage
getUserInfo(): User | null {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error('Error parsing user info:', error);
      return null;
    }
  }
  return null;
}


   // Handle user logout by removing API key and notifying user status
   logOut() {
    localStorage.removeItem('apikey');
    localStorage.removeItem('user');
    this.cartService.clearCart();  // Clear the cart upon logout
    this.userStatus.next('loggedOff');
  }

}
