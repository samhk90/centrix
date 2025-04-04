import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceInfoComponent } from './experience-info.component';

describe('ExperienceInfoComponent', () => {
  let component: ExperienceInfoComponent;
  let fixture: ComponentFixture<ExperienceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
