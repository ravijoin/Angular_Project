import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../shared/service/api.service';
import { MedicineService } from '../../shared/service/medicine.service';

@Component({
  selector: 'app-medicine-name',
  templateUrl: './medicine-name.component.html',
  styleUrl: './medicine-name.component.scss',
})
export class MedicineNameComponent {
  medicines: any[] = [
    {
      category: 'Painkillers',
      subCategory: 'NSAIDs',
      medicines: [
        { id: 1, name: 'Ashwagandha', price: 10, ordered: false },
        { id: 2, name: 'Aspirin', price: 15, ordered: false },
        { id: 3, name: 'Shilajit', price: 15, ordered: true },
        { id: 4, name: 'Trichup', price: 55, ordered: true },
        { id: 5, name: 'beta', price: 112, ordered: true },
        { id: 6, name: 'Thyrox', price: 15.45, ordered: true },
      ],
    },
    {
      category: 'Antibiotics',
      subCategory: 'Penicillin',
      medicines: [
        { id: 7, name: 'Amoxicillin', price: 25, ordered: true },
        { id: 8, name: 'Ciprofloxacin', price: 30, ordered: false },
        { id: 9, name: 'dolo', price: 30, ordered: false },
        { id: 10, name: 'zifi', price: 130, ordered: false },
      ],
    },
  ];

  medicinesToDisplay = this.medicines; // Display all medicines by default
  displayedColumns: string[] = ['id', 'name', 'price', 'available', 'order'];

  // Method to search medicines by name
  searchMedicines(searchValue: string) {
    const searchValueLower = searchValue.toLowerCase();
    this.medicinesToDisplay = this.medicines
      .map((item) => ({
        ...item,
        medicines: item.medicines.filter((med: { name: string }) =>
          med.name.toLowerCase().includes(searchValueLower)
        ),
      }))
      .filter((item) => item.medicines.length > 0); // Filter out categories with no matching medicines
  }

  // Method to get total number of medicines displayed
  getMedicineCount(): number {
    return this.medicinesToDisplay.reduce(
      (acc, item) => acc + item.medicines.length,
      0
    );
  }
}



// Not used dynamic code as getting error as 'Api is key is required as i have binded in below code'

// medicinesToDisplay: any[] = [];
  // displayedColumns: string[] = [
  //   'dosage_type',
  //   'medicine_name',
  //   'content',
  //   'mrp',
  //   'price',
  //   'medicine_id',
  //   'packing_size',
  //   'manufacturer_name',
  //   'medicine_type',
  //   'gst_percentage',
  //  ];

  // constructor(private medicineService: MedicineService) { }

  // ngOnInit(): void { }

  // searchMedicines(searchString: string): void {
  //   if (!searchString.trim()) {
  //     this.medicinesToDisplay = [];
  //     return;
  //   }

  //   this.medicineService.searchMedicines(searchString).subscribe(
  //     (response: any) => {
  //       console.log('API Response:', response);  // Log the response structure
  //       this.medicinesToDisplay = this.formatResponse(response); // Update medicinesToDisplay only after inspecting the response
  //     },
  //     (error: any) => {
  //       console.error('Error fetching medicines', error);
  //       // this.snackBar.open('Error fetching medicines', 'Close', { duration: 3000 });
  //     }
  //   );
  // }


  // formatResponse(response: any): any[] {
  //   if (!response.items) {
  //     return []; // Return an empty array if there's no 'items' property
  //   }
  //   // Format response to match the required structure
  //   // This is a placeholder and needs to be adapted to your actual API response format
  //   return response.map((item: any) => ({
  //     category: item.category,
  //     subCategory: item.subCategory,
  //     medicines: item.medicines.map((med: any) => ({
  //       dosage_type: med.dosage_type,
  //       medicine_name: med.medicine_name,
  //       content: med.content,
  //       mrp: med.mrp,
  //       price: med.price,
  //       medicine_id: med.medicine_id,
  //       packing_size: med.packing_size,
  //       manufacturer_name: med.manufacturer_name,
  //       medicine_type: med.medicine_type,
  //       gst_percentage: med.gst_percentage,
  //     }))
  //   }));
  // }



  // getMedicineCount(): number {
  //   return this.medicinesToDisplay.reduce((count, item) => count + item.medicines.length, 0);
  // }

