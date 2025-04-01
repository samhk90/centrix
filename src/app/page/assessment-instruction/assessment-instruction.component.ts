import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assessment-instruction',
  imports: [CommonModule,FormsModule],
  templateUrl: './assessment-instruction.component.html',
  styleUrl: './assessment-instruction.component.scss'
})
export class AssessmentInstructionComponent {
  activeTab: string = 'instructions';
openFaqs: number[] = [];
onsentChecked: boolean = false;
  // ...existing code...
constructor(private routes:Router) {}
toggleFaq(index: number): void {
  if (this.openFaqs.includes(index)) {
    this.openFaqs = this.openFaqs.filter(item => item !== index);
  } else {
    this.openFaqs.push(index);
  }
}
backtoDashboard(): void {
  this.routes.navigate(['/dashboard']);}
}
