import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CourseInfoComponent implements OnInit {
  // Static page title property for main layout component
  static readonly pageTitle: string = 'Course Details';
  
  constructor() { }

  ngOnInit(): void {
    // Load general course details
    this.loadCourseDetails();
  }
  
  loadCourseDetails(): void {
    // This would be replaced with an actual API call to get course details
    console.log(`Loading course details`);
    // Example: this.courseService.getFeaturedCourse().subscribe(data => this.course = data);
  }
}
