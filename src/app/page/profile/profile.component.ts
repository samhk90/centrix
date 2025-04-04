import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from '../../component/personal-info/personal-info.component';
import { AcademicInfoComponent } from '../../component/academic-info/academic-info.component';
import { ExperienceInfoComponent } from '../../component/experience-info/experience-info.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    PersonalInfoComponent,
    AcademicInfoComponent,
    ExperienceInfoComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  activeTab = 'personal';
  
  tabs = [
    { id: 'personal', name: 'Personal Information' },
    { id: 'academic', name: 'Academic' },
    { id: 'experience', name: 'Experience' }
  ];
}
