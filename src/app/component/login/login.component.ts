import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Here you would normally validate credentials with an auth service
    // For now, we'll just redirect on any submission
    if (this.username && this.password) {
      
      // Mock successful login
      localStorage.setItem('isLoggedIn', 'true');
      // Redirect to dashboard which will include the sidebar
      this.router.navigate(['/dashboard']);
    } else {
      // You could add validation error handling here
      console.error('Username and password are required');
    }
  }
}
