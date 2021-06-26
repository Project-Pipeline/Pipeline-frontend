import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderExperiencesComponent } from './resume-builder-experiences.component';

describe('ResumeBuilderExperiencesComponent', () => {
  let component: ResumeBuilderExperiencesComponent;
  let fixture: ComponentFixture<ResumeBuilderExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilderExperiencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeBuilderExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
