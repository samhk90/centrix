import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesPageComponent } from './page/courses-page/courses-page.component';
import { CourseInfoComponent } from './page/course-info/course-info.component';
import { EnrolledCoursesComponent } from './component/enrolled-courses/enrolled-courses.component';
import { AssessmentComponent } from './page/assessment/assessment.component';
import { AssessmentInstructionComponent } from './page/assessment-instruction/assessment-instruction.component';

import { ResultsComponent } from './page/results/results.component';
import { DetailResultComponent } from './page/detail-result/detail-result.component';
import { LeaderBoardComponent } from './page/leader-board/leader-board.component';
import { RoadMapsComponent } from './page/road-maps/road-maps.component';

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
      {path:'assessment',component:AssessmentComponent, data: { title: 'Assessments' }},
      { path: 'courseinfo', component: CourseInfoComponent, data: { title: 'Course Details' } },
      {path: 'enrolled-courses', component: EnrolledCoursesComponent, data: { title: 'Enrolled Course' }},
      {path:'instructions',component:AssessmentInstructionComponent, data: { title: 'Assessment Instructions' }},
      {path:'results',component:ResultsComponent, data: { title: 'Assessment Results' }},
      {path:'resultdetail',component:DetailResultComponent, data: { title: 'Assessment Result Details' }},
      {path:'roadmaps',component:RoadMapsComponent, data: { title: 'Road Maps' }},
      {path:'leaderboard',component:LeaderBoardComponent, data: { title: 'Leader Board' }},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  // Redirect any unknown paths to login
  { path: '**', redirectTo: '/login' }
];
