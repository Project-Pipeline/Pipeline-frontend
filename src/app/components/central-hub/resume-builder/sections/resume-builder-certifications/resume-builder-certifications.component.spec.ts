import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderCertificationsComponent } from './resume-builder-certifications.component';

describe('ResumeBuilderCertificationsComponent', () => {
  let component: ResumeBuilderCertificationsComponent;
  let fixture: ComponentFixture<ResumeBuilderCertificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilderCertificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeBuilderCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
