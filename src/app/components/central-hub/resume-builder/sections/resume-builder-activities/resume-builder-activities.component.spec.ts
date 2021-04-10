import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderActivitiesComponent } from './resume-builder-activities.component';

describe('ResumeBuilderActivitiesComponent', () => {
  let component: ResumeBuilderActivitiesComponent;
  let fixture: ComponentFixture<ResumeBuilderActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilderActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeBuilderActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
