import { Component } from '@angular/core';
import { AssesmentCardComponent } from '../../component/assesment-card/assesment-card.component';
import { InprogressCoursesComponent } from '../../component/inprogress-courses/inprogress-courses.component';

@Component({
  selector: 'app-assessment',
  imports: [AssesmentCardComponent],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss'
})
export class AssessmentComponent {

}
