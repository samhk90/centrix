import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseContainerComponent } from '../../component/course-container/course-container.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, CourseContainerComponent, RouterModule]
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {

  }
}
