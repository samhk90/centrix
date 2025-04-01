import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InprogressCoursesComponent } from './inprogress-courses.component';

describe('InprogressCoursesComponent', () => {
  let component: InprogressCoursesComponent;
  let fixture: ComponentFixture<InprogressCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InprogressCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InprogressCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
