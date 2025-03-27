import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent]
})
export class MainLayoutComponent implements OnInit {
  pageTitle = 'Dashboard';
  showProfileMenu = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    // Update page title based on route data
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.data)
    ).subscribe(data => {
      if (data['title']) {
        this.pageTitle = data['title'];
        this.titleService.setTitle(`Centrix - ${data['title']}`);
      }
    });
    
    // Check if user is logged in, redirect to login if not
    if (!localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/login']);
    }
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
