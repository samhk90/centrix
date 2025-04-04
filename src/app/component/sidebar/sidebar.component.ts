import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit {
  collapsed = false;
  mobileHidden = true;
  screenWidth = 0;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.screenWidth = window.innerWidth;
    this.collapsed = this.screenWidth < 768;
    this.mobileHidden = this.screenWidth < 768;
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    if (this.screenWidth < 768) {
      this.mobileHidden = this.collapsed;
    }
  }

  logout() {
    // Add any logout logic here (clear tokens, session etc.)
    localStorage.clear(); // or use your auth service method
    this.router.navigate(['/login']);
  }
}
