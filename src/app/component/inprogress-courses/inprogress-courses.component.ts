import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  image: string;
  progress: number;
  timeLeft?: string;
  flagReceived?: boolean;
  completionDate?: string;
  rating?: number;
}


@Component({
  selector: 'app-inprogress-courses',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './inprogress-courses.component.html',
  styleUrl: './inprogress-courses.component.scss'
})

export class InprogressCoursesComponent implements OnInit {
  isDashboard: boolean = false;
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedDate: string = '';
  selectedFlagStatus: string = '';
  
  completedCourses: Course[] = [
    {
      id: '1',
      title: 'Modern JavaScript',
      instructor: 'John Smith',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      progress: 100,
      completionDate: '2024-04-15',
      flagReceived: true,
      rating: 4.9
    },
    // Add more completed courses here
  ];
  
  filteredCourses: Course[] = [];
  activeCategory: 'inprogress' | 'completed' = 'inprogress';

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

  filterCourses(): void {
    this.filteredCourses = this.completedCourses
      .filter((course: Course) => 
        course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedCategory ? course.category === this.selectedCategory : true) &&
        this.applyDateFilter(course) &&
        this.applyFlagFilter(course)
      );
  }

  applyDateFilter(course: Course): boolean {
    if (!this.selectedDate) return true;
    switch (this.selectedDate) {
      case 'recent':
        return new Date(course.completionDate!) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      case 'oldest':
        return new Date(course.completionDate!) <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      default:
        return true;
    }
  }

  applyFlagFilter(course: Course): boolean {
    if (!this.selectedFlagStatus) return true;
    return this.selectedFlagStatus === 'received' ? !!course.flagReceived : !course.flagReceived;
  }

  onSearchChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.filterCourses();
  }

  onFilterChange(): void {
    this.filterCourses();
  }

  navigateToCompletedCourse(courseId: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.router.navigate(['/courseinfo', courseId]);
  }

  setActiveCategory(category: 'inprogress' | 'completed'): void {
    this.activeCategory = category;
    if (category === 'completed') {
      this.filterCourses(); // Apply filters when switching to completed courses
    }
  }
}