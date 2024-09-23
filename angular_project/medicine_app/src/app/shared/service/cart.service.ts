import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService   {
  private cart: any[] = [];
  private storageKey = 'cartItems';

  constructor() {
    this.loadCart();
  }

  loadCart(): void {
    const storedCart = localStorage.getItem(this.storageKey);
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  saveCart(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
  }

  getCartItems(): any[] {
    return this.cart;
  }

  addItemToCart(item: any): void {
    const existingItem = this.cart.find((i) => i.medicine_id === item.medicine_id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
    this.saveCart();
  }

  updateItemQuantity(item: any, quantity: number): void {
    const cartItem = this.cart.find((i) => i.medicine_id === item.medicine_id);
    if (cartItem && quantity > 0) {
      cartItem.quantity = quantity;
    } else {
      this.removeItemFromCart(item);
    }
    this.saveCart();
  }

  removeItemFromCart(item: any): void {
    this.cart = this.cart.filter((i) => i.medicine_id !== item.medicine_id);
    this.saveCart();
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }
}
