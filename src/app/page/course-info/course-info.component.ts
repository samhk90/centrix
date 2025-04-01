import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
  
  constructor(private router:Router) { }

  ngOnInit(): void {
    // Load general course details
    this.loadCourseDetails();
  }
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  loadCourseDetails(): void {
    // This would be replaced with an actual API call to get course details
    console.log(`Loading course details`);
    // Example: this.courseService.getFeaturedCourse().subscribe(data => this.course = data);
  }
  navigateToEnrolledCourse( event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent the card click event from firing when button is clicked
    }
    this.router.navigate(['/enrolled-courses']);
  }
}
