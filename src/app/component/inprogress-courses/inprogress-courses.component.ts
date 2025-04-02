import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inprogress-courses',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './inprogress-courses.component.html',
  styleUrl: './inprogress-courses.component.scss'
})
export class InprogressCoursesComponent implements OnInit {
  isDashboard: boolean = false;
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.isDashboard = this.router.url === '/dashboard';
  }
  
  viewAllCourses(): void {
    this.router.navigate(['/courses']);
  }


  navigateToEnrolledCourse(courseId: string, event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent the card click event from firing when button is clicked
    }
    this.router.navigate(['/courseinfo']);
  }
}