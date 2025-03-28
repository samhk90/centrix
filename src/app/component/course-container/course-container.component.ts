import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-container',
  templateUrl: './course-container.component.html',
  styleUrls: ['./course-container.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CourseContainerComponent {
  // Component logic goes here
}
