import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { zip } from 'rxjs';

@Component({
  selector: 'app-personal-info',
  imports: [CommonModule,FormsModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent {
  userInfo = {
    username: 'John Doe',
    profileImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Duser&psig=AOvVaw3tECenT1Hj6mRvyJACDZFA&ust=1743848319696000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjP3rWTvowDFQAAAAAdAAAAABAE',
    name: 'John Doe',
    title: 'Software Engineer',
    email: 'johndoe@gmail.com',
    phone: '123-456-7890',
    location: 'New York, USA',
    stats: {
      coursesCompleted: 10,
      achievements: 15,
      currentStreak: 7,
      totalCourses: 20,
      progress: '50%'
    },
    badges: [
      {
        name: 'Quick Learner',
        icon: 'assets/icons/quick-learner.svg'
      },
      {
        name: 'Problem Solver',
        icon: 'assets/icons/problem-solver.svg'
      },
      {
        name: 'Team Player',
        icon: 'assets/icons/team-player.svg'
      }
    ],
    achievements: [
      { title: 'Completed Angular Course', date: '2023-01-01' },
      { title: 'JavaScript Certification', date: '2023-02-15' },
      { title: 'React Course Completion', date: '2023-03-10' }
    ]
  }
  isEditing: boolean = false;
  
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    // Add save logic here
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }
}
