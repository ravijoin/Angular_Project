import { ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from '../../shared/service/cart.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/service/order.service';

@Component({
  selector: 'app-view-cart',
  standalone: false,
  // imports: [],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.scss',
})
export class ViewCartComponent {
  form!: FormGroup;
  cartItems: any[] = [];
  displayedColumns: string[] = [
    'medicine_name',
    'medicine_id',
    'quantity',
    'price',
    'remove',
  ];
  isCheckingOut = false;
  constructor(
    private cd: ChangeDetectorRef,
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  searchMedicine(): void {
    // Navigate or open a dialog to search medicines

    this.router.navigate(['dashboard/search-medicine']);
  }

  // Initialize form with a FormArray of items
  initializeForm(): void {
    this.form = this.fb.group({
      items: this.fb.array(
        this.cartItems.map((item) => this.createItemFormGroup(item))
      ),
    });
  }

  // Create a FormGroup for each item in the cart
  createItemFormGroup(item: any): FormGroup {
    return this.fb.group({
      medicine_name: [item.medicine_name],
      medicine_id: [item.medicine_id],
      quantity: [item.quantity],
      price: [item.price],
    });
  }
  // Load cart items from the CartService
  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    // Initialize the form after loading items
    this.initializeForm();
  }
  // Update quantity of an item
  updateQuantity(index: number): void {
    const control = this.items.at(index).get('quantity');
    const newQuantity = control?.value;
    const item = this.cartItems[index];
    item.quantity = newQuantity;

    if (newQuantity > 0) {
      this.cartService.updateItemQuantity(item, newQuantity);

      // Recalculate the total price
      this.getTotalPrice();

      // Manually trigger change detection to reflect the updated price in the UI
      this.cd.detectChanges();
    }
  }
  // Getter for FormArray items
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }
  getTotalPrice(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  // Remove item from the cart
  removeFromCart(index: number): void {
    const item = this.cartItems[index];
    this.cartService.removeItemFromCart(item);
    this.items.removeAt(index); // Remove the form control for this item
    this.cartItems.splice(index, 1); // Remove item from cartItems array

    // Recalculate total price
    this.getTotalPrice();
    this.loadCartItems();
  }

  // Proceed to checkout
  checkout(): void {
    this.isCheckingOut = true;
    const checkoutItems = this.cartItems.map((item) => ({
      medicine_id: item.medicine_id,
      quantity: item.quantity,
    }));

    // Store the checkout items in a service or pass it through routing
    this.orderService.setOrderItems(checkoutItems);

    // Navigate to the order checkout page
    // Set a timeout before navigating to the login page
    setTimeout(() => {
      this.router.navigate(['dashboard/order-checkout']);
    }, 2000);
  }
}
