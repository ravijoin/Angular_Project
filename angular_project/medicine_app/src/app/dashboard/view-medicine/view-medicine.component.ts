import { ChangeDetectorRef, Component } from '@angular/core';
import { MedicineService } from '../../shared/service/medicine.service';
import { CartService } from '../../shared/service/cart.service';

@Component({
  selector: 'app-view-medicine',
  standalone: false,
  // imports: [],
  templateUrl: './view-medicine.component.html',
  styleUrl: './view-medicine.component.scss',
})
export class ViewMedicineComponent {
  selectedMedicine: any = null; // Holds the selected medicine for ID-based search
  loading: boolean = false; // Shows loading spinner
  errorMessage: string = ''; // Error message
  medicineIds: string[] = [];
  medicine: any = null;
  medicinesToDisplay: any[] = [];
  private apikey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';

  displayedColumns: string[] = [
    'content',
    'how_medicine_works',
    'how_to_use',
    'id',
    'medicine_image',
    'is_rx_required',
    'dosage_type',
    'medicine_name',
    'mrp',
    'packing_size',
    'packing',
    'size',
    'manufacturer_name',
    'side_effects',
    'alcohol',
    'driving',
    'kidney',
    'liver',
    'lactation',
    'pregnancy',
    'medicine_category',
    'gst_percentage',
    'salt_content_id',
    'alternative_results',
    'medicine_images',
    'thumb_medicine_image',
  ];

  constructor(
    private medicineService: MedicineService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  // Search for medicine by ID
  viewMedicineById(medicineId: any): void {
    if (!medicineId.trim()) {
      this.medicinesToDisplay = [];
      this.errorMessage = 'Please enter a valid medicine ID';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const payload = {
      apikey: 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3',
      medicine_ids: [medicineId], // Make sure to pass as an array if that's what the API requires
      medicine_id: medicineId, // Including this if required by the API
    };

    this.medicineService.getMedicineById(payload).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.loading = false;

        this.medicinesToDisplay = this.formatResponse(response);
        console.log('Updated viewmedicinetodisplay:', this.medicinesToDisplay);
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
    console.log('Raw response for formatting:', response);

    if (!response.data) {
      console.log('No data found in response:', response);
      return [];
    }

    // Since the data is a single object, wrap it in an array for uniform handling
    let dataToProcess = response.data;
    if (!Array.isArray(dataToProcess)) {
      dataToProcess = [dataToProcess]; // Wrap the object in an array
    }

    return dataToProcess.map((item: any) => {
      console.log('Formatting item:', item);
      return {
        content: item.content,
        how_medicine_works: item.how_medicine_works,
        id: item.id,
        how_to_use: item.how_to_use,
        medicine_image: item.medicine_image,
        is_rx_required: item.is_rx_required,
        dosage_type: item.dosage_type,
        medicine_name: item.medicine_name,
        mrp: item.mrp,
        packing_size: item.packing_size,
        packing: item.packing,
        size: item.size,
        manufacturer_name: item.manufacturer_name,
        alcohol: item.alcohol,
        kidney: item.kidney,
        driving: item.driving,
        liver: item.liver,
        lactation: item.lactation,
        pregnancy: item.pregnancy,
        medicine_category: item.medicine_category,
        gst_percentage: item.gst_percentage,
        salt_content_id: item.salt_content_id,
        alternative_results: Array.isArray(item.alternative_results) ? item.alternative_results.map((alt: any) => ({
          name: alt.name,
          availability: alt.availability
        })) : [], // Check if it's an array
        medicine_images: Array.isArray(item.medicine_images) ? item.medicine_images.map((img: any) => ({
          url: img.medicine_image,
          isDefault: img.default === 'yes' // Assuming 'default' tells if the image is a default one
        })) : [],
        thumb_medicine_image: item.thumb_medicine_image,
      };
    });
  }

  addToCart(medicine: any) {
    this.cartService.addItemToCart(medicine);
    medicine.ordered = true; // Mark the medicine as ordered
  }
  getMedicineCount(): number {
    console.log('Number of medicines:', this.medicinesToDisplay.length);
    return this.medicinesToDisplay.length;
  }
}
