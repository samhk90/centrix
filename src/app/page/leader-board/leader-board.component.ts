import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  location: string;
  assessments: number;
  score: number;
  flags: number;
  lastActivity: string;
}

interface Department {
  name: string;
  members: number;
  flags: number;
}

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LeaderBoardComponent implements OnInit {
  locations: string[] = ['Pune', 'Mumbai', 'Kochi', 'Bangalore', 'Delhi', 'Marlborough'];
  selectedLocation: string = 'All';
  showLocationFilter: boolean = false;
  users: User[] = [];
  filteredUsers: User[] = [];
  departments: Department[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadMockData();
    this.filterByLocation('All');
  }

  toggleLocationFilter(): void {
    this.showLocationFilter = !this.showLocationFilter;
  }

  filterByLocation(location: string): void {
    this.selectedLocation = location;
    this.showLocationFilter = false;
    
    if (location === 'All') {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user => user.location === location);
    }
  }

  getLocationColor(location: string): string {
    switch (location) {
      case 'Pune': return 'bg-blue-500';
      case 'Mumbai': return 'bg-green-500';
      case 'Kochi': return 'bg-purple-500';
      case 'Bangalore': return 'bg-yellow-500';
      case 'Delhi': return 'bg-red-500';
      case 'Marlborough': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  }

  getDeptColor(dept: string): string {
    switch (dept) {
      case 'Engineering': return 'bg-blue-500';
      case 'Product Design': return 'bg-purple-500';
      case 'Marketing': return 'bg-green-500';
      case 'Sales': return 'bg-yellow-500';
      case 'Customer Support': return 'bg-red-500';
      case 'HR & Admin': return 'bg-indigo-500';
      case 'Research': return 'bg-teal-500';
      case 'Finance': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  }

  getScoreColor(score: number): string {
    if (score >= 90) {
      return 'bg-green-500';
    } else if (score >= 75) {
      return 'bg-blue-500';
    } else if (score >= 60) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  }

  private loadMockData(): void {
    this.users = [
      {
        id: 1,
        name: 'Arun Kumar',
        email: 'arun.kumar@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        location: 'Pune',
        assessments: 15,
        score: 96,
        flags: 24,
        lastActivity: '2 hours ago'
      },
      {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        location: 'Mumbai',
        assessments: 12,
        score: 94,
        flags: 21,
        lastActivity: '1 day ago'
      },
      {
        id: 3,
        name: 'Raj Patel',
        email: 'raj.patel@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        location: 'Kochi',
        assessments: 9,
        score: 91,
        flags: 19,
        lastActivity: '3 days ago'
      },
      {
        id: 4,
        name: 'Ananya Singh',
        email: 'ananya.singh@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        location: 'Bangalore',
        assessments: 11,
        score: 89,
        flags: 17,
        lastActivity: '5 hours ago'
      },
      {
        id: 5,
        name: 'Vikram Malhotra',
        email: 'vikram.malhotra@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        location: 'Delhi',
        assessments: 8,
        score: 87,
        flags: 15,
        lastActivity: '1 week ago'
      },
      {
        id: 6,
        name: 'Meera Reddy',
        email: 'meera.reddy@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
        location: 'Pune',
        assessments: 10,
        score: 85,
        flags: 14,
        lastActivity: '2 days ago'
      },
      {
        id: 7,
        name: 'Arjun Desai',
        email: 'arjun.desai@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
        location: 'Mumbai',
        assessments: 7,
        score: 82,
        flags: 12,
        lastActivity: '6 hours ago'
      },
      {
        id: 8,
        name: 'Neha Kapoor',
        email: 'neha.kapoor@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
        location: 'Kochi',
        assessments: 9,
        score: 80,
        flags: 11,
        lastActivity: '4 days ago'
      },
      {
        id: 9,
        name: 'Karan Verma',
        email: 'karan.verma@example.com',
        avatar: '',
        location: 'Marlborough',
        assessments: 6,
        score: 78,
        flags: 9,
        lastActivity: '3 days ago'
      },
      {
        id: 10,
        name: 'Divya Joshi',
        email: 'divya.joshi@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
        location: 'Delhi',
        assessments: 8,
        score: 76,
        flags: 8,
        lastActivity: '1 day ago'
      }
    ];

    // Department data for the chapter-wise leaderboard
    this.departments = [
      { name: 'Engineering', members: 42, flags: 156 },
      { name: 'Product Design', members: 23, flags: 118 },
      { name: 'Marketing', members: 18, flags: 87 },
      { name: 'Sales', members: 29, flags: 72 },
      { name: 'Customer Support', members: 31, flags: 64 },
      { name: 'HR & Admin', members: 15, flags: 49 },
      { name: 'Research', members: 12, flags: 43 },
      { name: 'Finance', members: 19, flags: 38 }
    ];
  }
}
