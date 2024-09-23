import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderItems: any[] = [];
  private baseUrlOrderAdd = 'https://dev-api.evitalrx.in/v1/fulfillment/orders/place_order';
  private baseUrlOrderCheckout = 'https://dev-api.evitalrx.in/v1/fulfillment/orders/checkout';
  private baseUrlOrderView = 'https://dev-api.evitalrx.in/v1/fulfillment/orders/view';
  private apikey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';


  constructor(private http: HttpClient) { }
  setOrderItems(items: any[]): void {
    this.orderItems = items;
  }

  getOrderItems(): any[] {
    return this.orderItems;
  }
  clearOrderItems(): void {
    this.orderItems = [];
  }
  placeOrder(order: any): Observable<any> {
    order['apikey'] = this.apikey;
    return this.http.post<any>(this.baseUrlOrderAdd, order).pipe(
      catchError(error => {
        console.error('Error adding patient:', error);
        return throwError(error);
      })
    );;
  }
  checkoutOrder(order: any): Observable<any> {
    order['apikey'] = this.apikey;
    return this.http.post<any>(this.baseUrlOrderCheckout, order).pipe(
      catchError(error => {
        console.error('Error adding patient:', error);
        return throwError(error);
      })
    );;
  }

  getOrderById(payload: { apikey: any, order_id: any }): Observable<any> {


    // Sending the POST request with the body
    return this.http.post<any>(this.baseUrlOrderView, payload).pipe(
      map((response: any) => {
        return response;  // Optionally process the response here
      }),
      catchError(error => {
        console.error('Error fetching medicines:', error);
        throw error;
      })
    );
  }



}
