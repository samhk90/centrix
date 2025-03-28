import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesPageComponent } from './page/courses-page/courses-page.component';
import { CourseInfoComponent } from './page/course-info/course-info.component';

// Auth guard function (modern approach with functional guards)
export const authGuard = () => {
  const router = inject(Router);
  
  if (localStorage.getItem('isLoggedIn') === 'true') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const routes: Routes = [
  // Public routes (no auth required)
  { path: 'login', component: LoginComponent },
  
  // Protected routes (auth required)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [() => authGuard()],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'courses', component: CoursesPageComponent, data: { title: 'Courses' } },
      { path: 'courseinfo', component: CourseInfoComponent, data: { title: 'Course Details' } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  // Redirect any unknown paths to login
  { path: '**', redirectTo: '/login' }
];
