import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Option {
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
}

interface Question {
  id: number;
  questionText: string;
  options: Option[];
  isCorrect: boolean;
  explanation?: string;
}

interface Assessment {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeTaken: string;
  completedDate: Date;
  questions: Question[];
}

@Component({
  selector: 'app-detail-result',
  templateUrl: './detail-result.component.html',
  styleUrls: ['./detail-result.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DetailResultComponent implements OnInit {
  assessment: Assessment | null = null;
  filteredQuestions: Question[] = [];
  selectedFilter: string = 'All';
  showFilter: boolean = false;
  percentage: number = 0;
  circumference: number = 2 * Math.PI * 16; // For the circle progress bar (r=16)

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // In a real app, you would fetch the assessment data based on the ID from the route
    // For now, we'll mock the data
    this.loadMockData();
    
    // Initialize filtered questions
    this.filterQuestions('All');
    
    // Calculate percentage
    if (this.assessment) {
      this.percentage = Math.round((this.assessment.correctAnswers / this.assessment.totalQuestions) * 100);
    }
  }
  
  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }
  
  filterQuestions(filter: string): void {
    this.selectedFilter = filter;
    this.showFilter = false;
    
    if (!this.assessment) return;
    
    switch (filter) {
      case 'Correct':
        this.filteredQuestions = this.assessment.questions.filter(q => q.isCorrect);
        break;
      case 'Incorrect':
        this.filteredQuestions = this.assessment.questions.filter(q => !q.isCorrect);
        break;
      default:
        this.filteredQuestions = [...this.assessment.questions];
        break;
    }
  }
  
  private loadMockData(): void {
    // Mock data for testing the UI
    this.assessment = {
      id: 'a123',
      title: 'JavaScript Fundamentals',
      difficulty: 'Medium',
      totalQuestions: 5,
      correctAnswers: 3,
      incorrectAnswers: 2,
      timeTaken: '12:34',
      completedDate: new Date(),
      questions: [
        {
          id: 1,
          questionText: 'What is the result of 2 + "2" in JavaScript?',
          options: [
            { text: '"22"', isSelected: true, isCorrect: true },
            { text: '4', isSelected: false, isCorrect: false },
            { text: 'Error', isSelected: false, isCorrect: false },
            { text: 'undefined', isSelected: false, isCorrect: false }
          ],
          isCorrect: true,
          explanation: 'In JavaScript, when you add a number and a string, the number is converted to a string and concatenated.'
        },
        {
          id: 2,
          questionText: 'Which method is used to remove the last element from an array in JavaScript?',
          options: [
            { text: 'pop()', isSelected: true, isCorrect: true },
            { text: 'push()', isSelected: false, isCorrect: false },
            { text: 'shift()', isSelected: false, isCorrect: false },
            { text: 'unshift()', isSelected: false, isCorrect: false }
          ],
          isCorrect: true
        },
        {
          id: 3,
          questionText: 'Which of the following is not a JavaScript data type?',
          options: [
            { text: 'Boolean', isSelected: false, isCorrect: false },
            { text: 'Float', isSelected: true, isCorrect: true },
            { text: 'Number', isSelected: false, isCorrect: false },
            { text: 'Symbol', isSelected: false, isCorrect: false }
          ],
          isCorrect: true,
          explanation: 'JavaScript has Boolean, Number, String, Object, Symbol, Undefined, and BigInt data types. There is no specific Float type as all numbers are of type Number.'
        },
        {
          id: 4,
          questionText: 'What does the "use strict" directive do in JavaScript?',
          options: [
            { text: 'Enforces stricter parsing and error handling', isSelected: true, isCorrect: true },
            { text: 'Makes the code run faster', isSelected: false, isCorrect: false },
            { text: 'Enables new JavaScript features', isSelected: false, isCorrect: false },
            { text: 'Prevents the use of async/await', isSelected: false, isCorrect: false }
          ],
          isCorrect: true
        },
        {
          id: 5,
          questionText: 'What is the result of typeof null in JavaScript?',
          options: [
            { text: '"null"', isSelected: false, isCorrect: false },
            { text: '"undefined"', isSelected: false, isCorrect: false },
            { text: '"object"', isSelected: false, isCorrect: true },
            { text: '"number"', isSelected: true, isCorrect: false }
          ],
          isCorrect: false,
          explanation: 'In JavaScript, typeof null returns "object" which is considered a bug in the language.'
        }
      ]
    };
  }

  getScoreColor(): string {
    if (this.percentage >= 80) {
      return '#22c55e'; // green-500
    } else if (this.percentage >= 60) {
      return '#3b82f6'; // blue-500
    } else if (this.percentage >= 40) {
      return '#eab308'; // yellow-500
    } else {
      return '#ef4444'; // red-500
    }
  }

  getScoreTextColor(): string {
    if (this.percentage >= 80) {
      return 'text-green-600 dark:text-green-400';
    } else if (this.percentage >= 60) {
      return 'text-blue-600 dark:text-blue-400';
    } else if (this.percentage >= 40) {
      return 'text-yellow-600 dark:text-yellow-400';
    } else {
      return 'text-red-600 dark:text-red-400';
    }
  }
}
