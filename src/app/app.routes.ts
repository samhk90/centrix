import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MainLayoutComponent } from './component/layouts/main-layout/main-layout.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

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
      // { path: 'courses', loadComponent: () => import('./page/courses/courses.component').then(m => m.CoursesComponent), data: { title: 'Courses' } },
      // { path: 'assignments', loadComponent: () => import('./page/assignments/assignments.component').then(m => m.AssignmentsComponent), data: { title: 'Assignments' } },
      // { path: 'calendar', loadComponent: () => import('./page/calendar/calendar.component').then(m => m.CalendarComponent), data: { title: 'Calendar' } },
      // { path: 'messages', loadComponent: () => import('./page/messages/messages.component').then(m => m.MessagesComponent), data: { title: 'Messages' } },
      // { path: 'forums', loadComponent: () => import('./page/forums/forums.component').then(m => m.ForumsComponent), data: { title: 'Forums' } },
      // { path: 'settings', loadComponent: () => import('./page/settings/settings.component').then(m => m.SettingsComponent), data: { title: 'Settings' } },
      // { path: 'help', loadComponent: () => import('./page/help/help.component').then(m => m.HelpComponent), data: { title: 'Help & Support' } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  // Redirect any unknown paths to login
  { path: '**', redirectTo: '/login' }
];
