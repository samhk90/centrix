import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ResultItem {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
}

interface CourseResult {
  id: number;
  name: string;
  category: string;
  score: number;
  duration: string;
  completionDate: Date;
  status: string;
  icon: string;
  iconBgColor: string;
  results: ResultItem[];
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  // Course assessment results
  courseResults: CourseResult[] = [
    {
      id: 1,
      name: 'Introduction to Web Development',
      category: 'Development',
      score: 85,
      duration: '45 minutes',
      completionDate: new Date('2023-11-10'),
      status: 'Passed',
      icon: 'fa-code',
      iconBgColor: '#4f46e5',
      results: [
        {
          question: 'What does HTML stand for?',
          userAnswer: 'Hypertext Markup Language',
          correctAnswer: 'Hypertext Markup Language',
          isCorrect: true,
          points: 10
        },
        {
          question: 'Which tag is used to create a hyperlink?',
          userAnswer: '<a>',
          correctAnswer: '<a>',
          isCorrect: true,
          points: 10
        },
        {
          question: 'What property is used to change the background color?',
          userAnswer: 'bgcolor',
          correctAnswer: 'background-color',
          isCorrect: false,
          points: 0
        }
      ]
    },
    {
      id: 2,
      name: 'Data Science Fundamentals',
      category: 'Data Science',
      score: 72,
      duration: '60 minutes',
      completionDate: new Date('2023-11-05'),
      status: 'Passed',
      icon: 'fa-chart-line',
      iconBgColor: '#0ea5e9',
      results: [
        {
          question: 'What is the primary language used in Data Science?',
          userAnswer: 'Python',
          correctAnswer: 'Python',
          isCorrect: true,
          points: 10
        },
        {
          question: 'Which library is commonly used for data visualization?',
          userAnswer: 'NumPy',
          correctAnswer: 'Matplotlib',
          isCorrect: false,
          points: 0
        }
      ]
    },
    {
      id: 3,
      name: 'Digital Marketing',
      category: 'Marketing',
      score: 45,
      duration: '30 minutes',
      completionDate: new Date('2023-10-28'),
      status: 'Failed',
      icon: 'fa-bullhorn',
      iconBgColor: '#f59e0b',
      results: [
        {
          question: 'What does SEO stand for?',
          userAnswer: 'Search Engine Organization',
          correctAnswer: 'Search Engine Optimization',
          isCorrect: false,
          points: 0
        }
      ]
    },
    {
      id: 4,
      name: 'Advanced JavaScript',
      category: 'Development',
      score: 95,
      duration: '50 minutes',
      completionDate: new Date('2023-11-15'),
      status: 'Passed',
      icon: 'fa-js',
      iconBgColor: '#ca8a04',
      results: [
        {
          question: 'What is a closure in JavaScript?',
          userAnswer: 'A function that has access to its outer function scope',
          correctAnswer: 'A function that has access to its outer function scope',
          isCorrect: true,
          points: 10
        }
      ]
    }
  ];

  filteredCourses: CourseResult[] = [];
  selectedCourse: CourseResult | null = null;
  courseSearchTerm: string = '';

  // For individual assessment questions
  resultItems: ResultItem[] = [];
  filteredResults: ResultItem[] = [];
  searchTerm: string = '';
  currentFilter: 'all' | 'correct' | 'incorrect' = 'all';

  get overallScore(): number {
    if (!this.selectedCourse) {
      // Calculate average score across all courses
      return Math.round(this.courseResults.reduce((sum, course) => sum + course.score, 0) / this.courseResults.length);
    }
    
    const totalPossiblePoints = this.resultItems.length * 10;
    const earnedPoints = this.resultItems.reduce((sum, result) => sum + result.points, 0);
    return Math.round((earnedPoints / totalPossiblePoints) * 100);
  }

  get correctAnswers(): number {
    return this.resultItems.filter(item => item.isCorrect).length;
  }

  get totalQuestions(): number {
    return this.resultItems.length;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filteredCourses = [...this.courseResults];
  }

  filterCourses(): void {
    if (!this.courseSearchTerm || this.courseSearchTerm.trim() === '') {
      this.filteredCourses = [...this.courseResults];
      return;
    }

    const searchTerm = this.courseSearchTerm.toLowerCase().trim();
    this.filteredCourses = this.courseResults.filter(course => 
      course.name.toLowerCase().includes(searchTerm) || 
      course.category.toLowerCase().includes(searchTerm)
    );
  }

  viewCourseDetails(): void {
    this.router.navigate(['resultdetail']);
  }

  backToCourseList(): void {
    this.selectedCourse = null;
    this.resultItems = [];
    this.filteredResults = [];
  }

  getScoreClass(score: number): string {
    if (score >= 80) return 'high-score';
    if (score >= 60) return 'medium-score';
    return 'low-score';
  }

  applyFilters(): void {
    // Start with all results
    let results = [...this.resultItems];
    
    // Apply search filter if there's a search term
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      results = results.filter(item => 
        item.question.toLowerCase().includes(term) ||
        item.userAnswer.toLowerCase().includes(term) ||
        item.correctAnswer.toLowerCase().includes(term)
      );
    }
    
    // Apply correct/incorrect filter
    if (this.currentFilter === 'correct') {
      results = results.filter(item => item.isCorrect);
    } else if (this.currentFilter === 'incorrect') {
      results = results.filter(item => !item.isCorrect);
    }
    
    this.filteredResults = results;
  }

  filterResults(filter: 'all' | 'correct' | 'incorrect'): void {
    this.currentFilter = filter;
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.currentFilter = 'all';
    this.filteredResults = [...this.resultItems];
  }

  retryAssessment(): void {
    // Navigate to the assessment page
    this.router.navigate(['/assessment']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
