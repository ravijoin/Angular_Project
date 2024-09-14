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
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'apikey': this.apikey
    });
  }



  login(info: any) {
    let params = new HttpParams()
      .append('mobile', info.mobile)
      .append('patient_id', info.patient_id)
      .append('apikey', this.apikey);

    return this.http.get(this.baseUrl + 'Login', {
      headers: this.getHeaders(),
      params: params,
      responseType: 'text',
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') != null;  // Check if the token exists
  }

  getUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;

    // You can modify this to handle user data from an API or stored token
    const user: User = {
      // Example for getting a stored user ID
      first_name: localStorage.getItem('first_name') || '',
      last_name: localStorage.getItem('last_name') || '',
      dob: localStorage.getItem('dob') || '',
      mobileNumber: localStorage.getItem('mobileNumber') || '',
      zipcode: localStorage.getItem('zipcode') || '',
      gender: localStorage.getItem('gender') || '',
      blood_group: localStorage.getItem('blood_group') || '',
      userType: UserType[localStorage.getItem('userType') as keyof typeof UserType] ,
    };
    return user;
  }

  logOut() {
    localStorage.removeItem('access_token');
    this.userStatus.next('loggedOff');
  }

  approveRequest(userId: number) {
    return this.http.get(this.baseUrl + 'ApproveRequest', {
      params: new HttpParams().append('userId', userId),
      headers: this.getHeaders(),
      responseType: 'text',
    });
  }

  blockUsers() {
    return this.http.get(this.baseUrl + 'BlockFineOverdueUsers', {
      headers: this.getHeaders(),
      responseType: 'text',
    });
  }

  unblock(userId: number) {
    return this.http.get(this.baseUrl + 'Unblock', {
      params: new HttpParams().append('userId', userId),
      headers: this.getHeaders(),
      responseType: 'text',
    });
  }
}
