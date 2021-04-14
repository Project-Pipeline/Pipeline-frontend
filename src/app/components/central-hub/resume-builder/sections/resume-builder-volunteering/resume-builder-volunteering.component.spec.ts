import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderVolunteeringComponent } from './resume-builder-volunteering.component';

describe('ResumeBuilderVolunteeringComponent', () => {
  let component: ResumeBuilderVolunteeringComponent;
  let fixture: ComponentFixture<ResumeBuilderVolunteeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilderVolunteeringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeBuilderVolunteeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
