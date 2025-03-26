import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Changed from scss to css to match your actual file
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  onSubmit() {
    console.log('Login attempt with:', { 
      username: this.username,
      password: '******',
      rememberMe: this.rememberMe
    });
  }
}
