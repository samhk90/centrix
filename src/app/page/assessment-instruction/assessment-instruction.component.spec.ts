import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentInstructionComponent } from './assessment-instruction.component';

describe('AssessmentInstructionComponent', () => {
  let component: AssessmentInstructionComponent;
  let fixture: ComponentFixture<AssessmentInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentInstructionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
