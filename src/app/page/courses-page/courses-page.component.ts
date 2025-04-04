import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InprogressCoursesComponent } from '../../component/inprogress-courses/inprogress-courses.component';
import { CourseContainerComponent } from '../../component/course-container/course-container.component';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule,InprogressCoursesComponent,CourseContainerComponent]
})
export class CoursesPageComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
    // Component initialization logic
  }
}
