import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assesment-card',
  imports: [],
  templateUrl: './assesment-card.component.html',
  styleUrl: './assesment-card.component.scss'
})
export class AssesmentCardComponent {
  constructor (private router:Router) { } 

  navigateToAssessmentInstruction(): void {
    this.router.navigate(['/instructions']);
  }
}
