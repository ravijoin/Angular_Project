// medicine.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private apiUrlSearch = 'https://api.evitalrx.in/v1/fulfillment/medicines/search';
  private apiUrlProduct = 'https://api.evitalrx.in/v1/fulfillment/medicines/view';
  private apikey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3'; // Your API key

  constructor(private http: HttpClient) {}

  // Method to get medicines from API
  searchMedicines(searchQuery: string): Observable<any> {
    const queryParams = {
      apikey: this.apikey,
      searchstring: searchQuery // Ensure the parameter name matches what the API expects
    };
    return this.http.post<any>(this.apiUrlSearch, { params: queryParams })
      .pipe(
        catchError(this.handleError)
      );
  }


  placeOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlProduct, orderData);
  }
  // Error handler
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
