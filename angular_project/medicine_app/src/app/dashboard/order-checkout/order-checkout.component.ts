import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../shared/service/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-checkout',
  standalone: false,
  // imports: [],
  templateUrl: './order-checkout.component.html',
  styleUrl: './order-checkout.component.scss',
})
export class OrderCheckoutComponent implements OnInit{
  orderForm!: FormGroup;
  checkoutItems: any[] = [];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadCheckoutItems();
  }

  createForm(): void {
    this.orderForm = this.fb.group({
      items: this.fb.array([]),
      latitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      distance: ['', [Validators.required, Validators.min(1)]],
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      medicine_id: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const formData = { ...this.orderForm.value };
      formData.items = JSON.stringify(this.orderForm.value.items);

      this.orderService.checkoutOrder(formData).subscribe({
        next: (response: any) => {
          if (response.status_code === '1') {
            const items = response.data.items;
            const availableItems = items.filter((item: { available: string; }) => item.available === 'yes');

            if (availableItems.length > 0) {
              this.router.navigate(['/dashboard/place-orders'], { state: { orderData: formData } });
              this.snackBar.open('Medicines available.Place the order', 'OK', { duration: 4000 });
            } else {
              this.snackBar.open('No available medicines in your area.Please search for the alternatives', 'OK', { duration: 4000 });
            }
          } else {
            this.snackBar.open(response.status_message + '.' +'Please search for the alternatives', 'OK', { duration: 4000 });
          }
        },
        error: (error: any) => {
          this.snackBar.open('Error placing the order. Please try again.', 'OK', { duration: 4000 });
          console.error('Error placing order:', error);
        },
      });
    } else {
      this.snackBar.open('Please fill the form correctly.', 'OK', { duration: 4000 });
    }
  }

  loadCheckoutItems() {
    this.checkoutItems = this.orderService.getOrderItems();
    this.checkoutItems.forEach(item => {
      this.items.push(this.fb.group({
        medicine_id: [item.medicine_id, Validators.required],
        quantity: [item.quantity, [Validators.required, Validators.min(1)]]
      }));
    });
  }
}
