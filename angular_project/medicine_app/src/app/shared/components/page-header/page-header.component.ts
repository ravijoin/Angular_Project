import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';

import { PatientService } from '../../service/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent implements OnInit {
  loggedIn: boolean = false;
  name: string = '';
  @HostBinding('class') class: string = '';
  isDark: boolean = false;
  constructor(
    private patientService: PatientService,
    public cartService: CartService,

    private renderer: Renderer2,
    private snackBar: MatSnackBar
  ) {
    patientService.userStatus.subscribe({
      next: (res) => {
        if (res == 'loggedIn') {
          this.loggedIn = true;
          let user = patientService.getUserInfo()!;
          this.name = `${user.first_name} ${user.last_name}`;
        } else {
          this.loggedIn = false;
          this.name = '';
        }
      },
    });
  }

    // Function to get the username of the logged-in user
    getUsername(): string {
      return this.loggedIn ? this.name : 'Guest'; // Return the actual name or 'Guest'
    }
  // Function to check if user is logged in
  isLoggedIn(): boolean {
    return this.patientService.isLoggedIn();
  }
  getCartCount() {
    return this.cartService.getCartItems().length;
  }
  ngOnInit(): void {
    this.isDark = localStorage.getItem('theme') == 'dark';
    this.setTheme(this.isDark);
  }
  logout() {
    this.patientService.logOut();
  }

  setTheme(isdark: boolean) {
    if (isdark) {
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
