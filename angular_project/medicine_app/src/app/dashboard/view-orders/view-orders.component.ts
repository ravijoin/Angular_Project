import { ChangeDetectorRef, Component } from '@angular/core';
import { OrderService } from '../../shared/service/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-orders',
  standalone: false,
  // imports: [],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.scss'
})
export class ViewOrdersComponent {
  selectedMedicine: any = null; // Holds the selected medicine for ID-based search
  loading: boolean = false; // Shows loading spinner
  errorMessage: string = ''; // Error message
  medicineIds: string[] = [];
  medicine: any = null;
  ordersToDisplay: any[] = [];
  private apikey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';




  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) { }

  // Search for medicine by ID
  viewOrderById(orderId: any): void {
    if (!orderId.trim()) {
      this.ordersToDisplay = [];
      this.errorMessage = 'Please enter a valid medicine ID';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const payload = {
      apikey:'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3',  // Use the API key from your class
      order_id: orderId,
    };

    this.orderService.getOrderById(payload).subscribe(
      (response: any) => {
        this.loading = false;
        console.log('API Response:', response);

        if (response.status_code === "0") {
          // Handle invalid order key scenario
          this.errorMessage = 'Invalid Order ID. Please check and try again.';
          this.ordersToDisplay = [];
        } else if (response.data) {
          this.ordersToDisplay = this.formatResponse(response);
        } else {
          this.errorMessage = 'No data found for the provided Order ID.';
          this.ordersToDisplay = [];
        }

        this.cdr.detectChanges();
      },
      (error: any) => {
        this.loading = false;
        this.errorMessage = 'Error fetching medicines by name';
        console.error('Error fetching medicines', error);
      }
    );
  }


  formatResponse(response: any): any[] {
    if (!response.data) {
      console.log('No data found in response:', response);
      return [];
    }

    let dataToProcess = Array.isArray(response.data) ? response.data : [response.data];

    return dataToProcess.map((item: any) => {
      return {
        id: item.id,
        order_number: item.order_number,
        amount: item.amount,
        discount: item.discount,
        total: item.total,
        address_name: item.address_name,
        address: item.address,
        address_line2: item.address_line2,
        city: item.city,
        state: item.state,
        zipcode: item.zipcode,
        order_status: item.order_status,
        created_date: item.created_date,
        order_delivery_datetime: item.order_delivery_datetime,
        pharmacy_name: item.pharmacy_name,
        chemist_mobile: item.chemist_mobile,
        chemist_address: item.chemist_address,
        chemist_city: item.chemist_city,
        chemist_latitude: item.chemist_latitude,
        chemist_longitude: item.chemist_longitude,
        chemist_state: item.chemist_state,
        chemist_zipcode: item.chemist_zipcode,
        order_patient_name: item.order_patient_name,
        pharmacist_name: item.pharmacist_name,
        delivery_note: item.delivery_note,
        payment_status: item.payment_status,
        patient_id: item.patient_id,
        delivery_pin: item.delivery_pin,
        payment_ref_id: item.payment_ref_id,
        medicine_details: item.medicine_details,
        prescription_details: item.prescription_details,
        payment_url: item.payment_url,
      };
    });
  }

  getMedicineCount(): number {
    console.log('Number of medicines:', this.ordersToDisplay.length);
    return this.ordersToDisplay.length;
  }
}
