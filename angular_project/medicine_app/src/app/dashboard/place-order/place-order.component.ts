import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicineService } from '../../shared/service/medicine.service';
import { OrderService } from '../../shared/service/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../../shared/service/cart.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss',
})
export class PlaceOrderComponent {
  orderForm!: FormGroup;
  checkoutItems: any[] = [];
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    this.loadCheckoutItems();
    this.getCurrentLocation();
  }

  geolocationError = '';
  // Get the current location of the user using the browser's geolocation API
  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Update the form with the retrieved latitude and longitude
          this.orderForm.patchValue({
            latitude: lat,
            longitude: lon,
          });
        },
        (error) => {
          this.isLoading = false; // Stop loading on error
          this.geolocationError =
            'Unable to retrieve your location. Please allow location access.';
          this.snackBar.open(this.geolocationError, 'OK', { duration: 4000 });
        }
      );
    } else {
      this.geolocationError = 'Geolocation is not supported by this browser.';
      this.snackBar.open(this.geolocationError, 'OK', { duration: 4000 });
    }
  }
  // Initialize the form group
  createForm(): void {
    this.orderForm = this.fb.group({
      items: this.fb.array([this.createItem()]), // Create a FormArray for items
      delivery_type: ['', Validators.required],
      patient_name: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)],
      ],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      auto_assign: [true],
      chemist_id: ['', Validators.required],
      latitude: ['', Validators.pattern(/^-?\d+(\.\d+)?$/)],
      longitude: ['', Validators.pattern(/^-?\d+(\.\d+)?$/)],
    });
  }

  // Getter for items array
  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  // Create an individual item form group
  createItem(): FormGroup {
    return this.fb.group({
      medicine_id: ['', Validators.required], // Ensure medicine_id is required
      quantity: [1, [Validators.required, Validators.min(1)]], // Minimum quantity 1
    });
  }

  // Add a new item to the array
  addItem(): void {
    this.items.push(this.createItem());
  }

  // Remove an item from the array
  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  // Submit the form data
  onSubmit(): void {
    if (this.orderForm.valid) {
      this.isLoading = true; // Start showing the progress bar
      // Stringify the 'items' array before sending it in the request
      const formData = { ...this.orderForm.value };
      formData.items = JSON.stringify(this.orderForm.value.items);

      this.orderService.placeOrder(formData).subscribe({
        next: (response) => {
          this.isLoading = false; // Stop loading
          if (response.status_code === '1') {
            this.snackBar.open('Order placed successfully!', 'OK', {
              duration: 4000,
            });
            this.cartService.clearCart(); // Clear the cart after successful order
            console.log('Order placed successfully', response);
            // You can navigate to another page if needed
            setTimeout(() => {
              this.router.navigate(['/dashboard/thankyou']);
            }, 2000);
          }
          else {
            this.snackBar.open(response.status_message, 'OK', {
              duration: 4000,
            });
          }
        },
        error: (error) => {
          this.isLoading = false; // Stop loading
          this.snackBar.open('Error placing order. Please try again.', 'OK', {
            duration: 4000,
          });
          console.error('Error placing order', error);
        },
      });
    }
  }
  loadCheckoutItems() {
    this.checkoutItems = this.orderService.getOrderItems();
    this.checkoutItems.forEach((item) => {
      this.items.push(
        this.fb.group({
          medicine_id: [item.medicine_id, Validators.required],
          quantity: [item.quantity, [Validators.required, Validators.min(1)]],
        })
      );
    });
  }
  // Optionally, load initial data if needed
  // loadOrderData(): void {
  //   this.orderService.placeOrder(this.orderForm.value).subscribe((data) => {
  //     this.orderForm.patchValue({
  //       delivery_type: data.delivery_type,
  //       patient_name: data.patient_name,
  //       mobile: data.mobile,
  //       address: data.address,
  //       city: data.city,
  //       state: data.state,
  //       zipcode: data.zipcode,
  //       auto_assign: data.auto_assign,
  //       chemist_id: data.chemist_id,
  //       latitude: data.latitude,
  //       longitude: data.longitude,
  //     });

  //     const itemsFormArray = this.orderForm.get('items') as FormArray;

  //     // Ensure data.items is valid and is an array
  //     if (data.items && Array.isArray(data.items)) {
  //       // Remove all current items in the form
  //       while (itemsFormArray.length) {
  //         itemsFormArray.removeAt(0);
  //       }

  //       // Add items from the data received
  //       data.items.forEach((item: { medicine_id: any; quantity: any }) => {
  //         itemsFormArray.push(
  //           this.fb.group({
  //             medicine_id: [item.medicine_id, Validators.required],
  //             quantity: [
  //               item.quantity,
  //               [Validators.required, Validators.min(1)],
  //             ],
  //           })
  //         );
  //       });
  //     } else {
  //       console.error('Invalid or undefined items data:', data.items);
  //     }
  //   });
  // }
}
