import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseContainerComponent } from '../../component/course-container/course-container.component';
import { RouterModule } from '@angular/router';
import { InprogressCoursesComponent } from '../../component/inprogress-courses/inprogress-courses.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, CourseContainerComponent, RouterModule,InprogressCoursesComponent]
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {

  }
}
