import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderEducationComponent } from './resume-builder-education.component';

describe('ResumeBuilderEducationComponent', () => {
  let component: ResumeBuilderEducationComponent;
  let fixture: ComponentFixture<ResumeBuilderEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilderEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeBuilderEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
