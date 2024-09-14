import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicineService } from '../../shared/service/medicine.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss',
})
export class PlaceOrderComponent {
  orderForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      patient_id: [''],
      mobile: [''],
      apikey: ['your-api-key', Validators.required], // API key (replace with actual value)
      delivery_type: ['pickup', Validators.required], // Default to 'pickup'
      address: [''], // Optional
      address_line2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      items: this.fb.array([]), // Array of items
      latitude: [''],
      longitude: [''],
      full_address: [''], // Required if lat-long is not provided
    });

    // Add pre-filled items to the form
    this.addItemsToOrder();
  }

  // Getter for items array
  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  // Add selected medicines to the order form
  addItemsToOrder() {
    const medicinesToOrder = [
      { medicine_id: 'Eli4pMFfzobV63G67jtjZw==', quantity: 2 },
    ];

    medicinesToOrder.forEach((item) => {
      this.items.push(
        this.fb.group({
          medicine_id: [item.medicine_id, Validators.required],
          quantity: [item.quantity, [Validators.required, Validators.min(1)]],
        })
      );
    });
  }

  // Method to submit the order
  placeOrder() {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      console.log('Order Data:', orderData);

      this.medicineService.placeOrder(orderData).subscribe(
        (response: any) => {
          console.log('Order placed successfully', response);
        },
        (error: any) => {
          console.error('Error placing order', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
