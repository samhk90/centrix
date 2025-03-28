import { Component, OnInit, Injector } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';

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
  
  // Title mapping to use when route data is unavailable
  private readonly pageTitleMap: {[key: string]: string} = {
    '/dashboard': 'Dashboard',
    '/courses': 'Courses',
    '/assignments': 'Assessment',
    '/calendar': 'Leader Board',
    '/roadmaps': 'Roadmaps',
    '/settings': 'Settings',
    '/help': 'Help & Support'
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private injector: Injector
  ) {}

  ngOnInit() {
    // Set title initially based on current route
    this.updateTitleFromCurrentRoute();
    
    // Update title on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitleFromCurrentRoute();
    });
    
    // Check if user is logged in, redirect to login if not
    if (!localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/login']);
    }
  }
  
  /**
   * Updates page title based on current route
   */
  private updateTitleFromCurrentRoute(): void {
    // Get current route and extract component
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    
    try {
      // Try to get component class from route
      const componentClass = route.component as any;
      
      // 1. Try to use static pageTitle property from the component
      if (componentClass && componentClass.pageTitle) {
        this.setTitle(componentClass.pageTitle);
        return;
      }
      
      // 2. Try to use route data
      const routeData = route.snapshot.data;
      if (routeData && routeData['title']) {
        this.setTitle(routeData['title']);
        return;
      }
      
      // 3. Fall back to URL-based title mapping
      const currentUrl = this.router.url.split('?')[0].split('#')[0];
      for (const path in this.pageTitleMap) {
        if (currentUrl.startsWith(path)) {
          this.setTitle(this.pageTitleMap[path]);
          return;
        }
      }
      
      // 4. Extract title from URL as last resort
      const urlSegments = currentUrl.split('/').filter(s => s);
      if (urlSegments.length > 0) {
        // Capitalize the last segment
        const lastSegment = urlSegments[urlSegments.length - 1];
        const titledSegment = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
        this.setTitle(titledSegment);
        return;
      }
      
      // 5. Absolute fallback
      this.setTitle('Dashboard');
      
    } catch (error) {
      console.error('Error updating title:', error);
      this.setTitle('Dashboard');
    }
  }
  
  /**
   * Sets the page title in both component and browser
   */
  private setTitle(title: string): void {
    this.pageTitle = title;
    this.titleService.setTitle(`Centrix - ${title}`);
    // Store in localStorage for persistence on refresh
    localStorage.setItem('pageTitle', title);
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('pageTitle');
    this.router.navigate(['/login']);
  }
}
