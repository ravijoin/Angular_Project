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
