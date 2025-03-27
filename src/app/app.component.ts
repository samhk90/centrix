import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class AppComponent implements OnInit {
  title = 'Centrix';
  
  constructor() {}
  
  ngOnInit() {
    // Any global initialization can go here
    this.initializeApp();
  }
  
  private initializeApp() {

    
    // Other global app initialization
    console.log('Centrix application initialized');
  }
}
