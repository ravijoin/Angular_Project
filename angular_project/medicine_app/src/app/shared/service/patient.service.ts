import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { RegisterComponent } from '../../auth/register/register.component';
import { Observable, Subject } from 'rxjs';
import { RegisterResponse, User } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public baseUrlAdd = 'https://api.evitalrx.in/v1/fulfillment/patients/add';
  public baseUrlView = 'https://api.evitalrx.in/v1/fulfillment/patients/view';
public apikey = "wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3";

userStatus: Subject<string> = new Subject();

constructor(private http: HttpClient) { }

getPatientDetails(patientId?: string, mobile?: string) {
  let body: Record<string, any> = {
    patient_id: patientId,
    mobile: mobile
  };

  // Remove undefined keys
  Object.keys(body).forEach(key => {
    if (body[key] === undefined) {
      delete body[key];
    }
  });

  const headers = new HttpHeaders({
    'apikey': this.apikey // Ensure the correct header is used
  });
  console.log('Request Body:', body);
  console.log('Request Headers:', headers);

  return this.http.post<any>(this.baseUrlView, body, { headers })
    .pipe(
      catchError(error => {
        console.error('Error fetching patient details:', error);
        return throwError(error);
      })
    );
}


addPatient(patientData: any): Observable<RegisterResponse> {
  const headers = new HttpHeaders({
    'apikey': this.apikey
  });
  console.log('Request Headers:', headers);

  return this.http.post<RegisterResponse>(this.baseUrlAdd, patientData, { headers })  // Explicitly type the response here
    .pipe(
      catchError(error => {
        console.error('Error adding patient:', error);
        return throwError(error);
      })
    );
}
isLoggedIn(): boolean {
  return localStorage.getItem('access_token') != null;  // Check if the token exists
}


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







logOut() {
  localStorage.removeItem('access_token');
  this.userStatus.next('loggedOff');
}
}
