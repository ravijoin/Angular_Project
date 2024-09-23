import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User, UserType } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://api.evitalrx.in/v1/fulfillment/';
  private apikey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';

  userStatus: Subject<string> = new Subject();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');  // Fetch token from local storage
    return new HttpHeaders({

      'Content-Type': 'application/json',
      'apikey': this.apikey
    });
  }
  // Method to get API key from localStorage
  private getApiKey(): string | null {
    return localStorage.getItem('apikey');  // Fetch API key from localStorage
  }

  // Method to set the API key in localStorage (called after successful login)
  private setApiKey(apiKey: string): void {
    localStorage.setItem('apikey', apiKey);  // Store API key in localStorage
  }

  // Method to remove API key from localStorage (called on logout)
  private clearApiKey(): void {
    localStorage.removeItem('apikey');  // Remove API key from localStorage
  }


// Example API call: Login
login(info: any) {
  let params = new HttpParams()
    .append('mobile', info.mobile)
    .append('patient_id', info.patient_id);

  return this.http.get(this.baseUrl + 'Login', {
    headers: this.getHeaders(),  // Attach headers with API key
    params: params,
    responseType: 'text',
  }).subscribe((response: any) => {
    // Assuming the login was successful, store the API key in localStorage
    this.setApiKey('wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3');  // Store the static API key on login
    this.userStatus.next('loggedIn');  // Update the user status to logged in
  }, error => {
    console.error('Login failed', error);
    // Handle login failure
  });
}

// Method for logging out
logOut() {
  // Clear the API key and notify the rest of the app
  this.clearApiKey();  // Remove API key from localStorage
  this.userStatus.next('loggedOff');  // Notify app that the user logged off
}

// Example API call: Fetch data using stored API key
fetchData() {
  return this.http.get(this.baseUrl + 'SomeData', {
    headers: this.getHeaders(),
  });
}
}
