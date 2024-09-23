import { ChangeDetectorRef, Component } from '@angular/core';

import { MedicineService } from '../../shared/service/medicine.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../../shared/service/cart.service';

@Component({
  selector: 'app-medicine-name',
  templateUrl: './medicine-name.component.html',
  styleUrl: './medicine-name.component.scss',
})
export class MedicineNameComponent {
  // Medicine IDs for fetching multiple medicines
  medicineIds: string[] = ['gv0GokYn9w4zFL51eouS2g==']; // Example medicine IDs

   medicinesToDisplay: any[] = [];



  selectedMedicine: any = null; // Holds the selected medicine for ID-based search
  loading: boolean = false; // Shows loading spinner
  errorMessage: string = ''; // Error message

  // Columns to display in the table
  displayedColumns: string[] = [
    'dosage_type',
    'medicine_id',
    'medicine_name',
    'content',
    'mrp',
    'price',
    'size',
    'packing_size',
    'manufacturer_name',
    'medicine_type',
    'gst_percentage',
    'available_for_patient',
    'discontinued',
    'add_to_cart'
  ];

  constructor(
    private medicineService: MedicineService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private router:Router
  ) {}

  ngOnInit(): void {
    // Loads initial set of medicines by IDs
  }

  // Search for medicine by ID


  // Search for medicines by name
  searchMedicines(searchString: string): void {
    console.log('Searching for:', searchString);
    if (!searchString.trim()) {
      this.medicinesToDisplay = [];
      console.log('MedicinesToDisplay reset:', this.medicinesToDisplay);
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.medicineService.searchMedicines(searchString).subscribe(
      (response: any) => {
        console.log(response);
        this.loading = false;

        this.medicinesToDisplay = this.formatResponse(response);
        console.log('Updated medicinesToDisplay:', this.medicinesToDisplay);
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
    console.log('Raw response for formatting:', response); // Log raw response

    if (!response.data || !response.data.result || response.data.result.length === 0) {
      console.log('No data found in response:', response);
      return [];
    }

    return response.data.result.map((item: any) => {
      // console.log('Formatting item:', item); // Log each item to verify structure
      return {
        dosage_type: item.dosage_type,
        medicine_name: item.medicine_name,
        content: item.content,
        mrp: item.mrp,
        price: item.price,
        size: item.size,
        medicine_id: item.medicine_id,
        packing_size: item.packing_size,
        manufacturer_name: item.manufacturer_name,
        medicine_type: item.medicine_type,
        gst_percentage: item.gst_percentage,
        available_for_patient: item.available_for_patient,
        discontinued: item.discontinued,
      };
    });
  }
  viewMedicineById(){
    this.router.navigate(['/dashboard/view-medicineById'])
  }
 // Navigate to the place order page
 checkout(item: any) {
  // Navigate to the place order page and pass necessary data if needed
  this.router.navigate(['/dashboard/order-checkout'], { state: { medicine: item } });
}
addToCart(medicine: any) {
  this.cartService.addItemToCart(medicine);
  medicine.ordered = true; // Mark the medicine as ordered
}
  // Get total number of medicines found
  getMedicineCount(): number {
    // console.log('Number of medicines:', this.medicinesToDisplay.length);
    return this.medicinesToDisplay.length;
  }
}





// medicines: any[] = [
//   {
//     category: 'Painkillers',
//     subCategory: 'NSAIDs',
//     medicines: [
//       { id: 1, name: 'Ashwagandha', price: 10, ordered: false },
//       { id: 2, name: 'Aspirin', price: 15, ordered: false },
//       { id: 3, name: 'Shilajit', price: 15, ordered: true },
//       { id: 4, name: 'Trichup', price: 55, ordered: true },
//       { id: 5, name: 'beta', price: 112, ordered: true },
//       { id: 6, name: 'Thyrox', price: 15.45, ordered: true },
//     ],
//   },
//   {
//     category: 'Antibiotics',
//     subCategory: 'Penicillin',
//     medicines: [
//       { id: 7, name: 'Amoxicillin', price: 25, ordered: true },
//       { id: 8, name: 'Ciprofloxacin', price: 30, ordered: false },
//       { id: 9, name: 'dolo', price: 30, ordered: false },
//       { id: 10, name: 'zifi', price: 130, ordered: false },
//     ],
//   },
// ];

// medicinesToDisplay = this.medicines; // Display all medicines by default
// displayedColumns: string[] = ['id', 'name', 'price', 'available', 'order'];

// // Method to search medicines by name
// searchMedicines(searchValue: string) {
//   const searchValueLower = searchValue.toLowerCase();
//   this.medicinesToDisplay = this.medicines
//     .map((item) => ({
//       ...item,
//       medicines: item.medicines.filter((med: { name: string }) =>
//         med.name.toLowerCase().includes(searchValueLower)
//       ),
//     }))
//     .filter((item) => item.medicines.length > 0); // Filter out categories with no matching medicines
// }

// // Method to get total number of medicines displayed
// getMedicineCount(): number {
//   return this.medicinesToDisplay.reduce(
//     (acc, item) => acc + item.medicines.length,
//     0
//   );
// }
