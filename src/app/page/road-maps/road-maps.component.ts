import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Checkpoint {
  title: string;
  description: string;
  icon: string;
  courses: string[];
  completed: boolean;
  inProgress: boolean;
}

@Component({
  selector: 'app-road-maps',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './road-maps.component.html',
  styleUrl: './road-maps.component.scss'
})
export class RoadMapsComponent {
  checkpoints: Checkpoint[] = [
    {
      title: 'Getting Started',
      description: 'Begin your journey with fundamentals',
      icon: 'fas fa-rocket',
      courses: ['Programming Basics', 'Logic Building', 'Problem Solving'],
      completed: true,
      inProgress: false
    },
    {
      title: 'Core Concepts',
      description: 'Master the essential concepts',
      icon: 'fas fa-code',
      courses: ['Data Structures', 'Algorithms', 'Object-Oriented Programming'],
      completed: false,
      inProgress: false
    },
    {
      title: 'Advanced Topics',
      description: 'Dive into advanced subjects',
      icon: 'fas fa-laptop-code',
      courses: ['System Design', 'Design Patterns', 'Architecture'],
      completed: false,
      inProgress: false
    },
    {
      title: 'Specialization',
      description: 'Choose your specialization path',
      icon: 'fas fa-brain',
      courses: ['Web Development', 'Mobile Development', 'Cloud Computing'],
      completed: false,
      inProgress: false
    }
  ];
}
