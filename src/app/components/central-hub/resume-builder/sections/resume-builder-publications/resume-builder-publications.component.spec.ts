import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderPublicationsComponent } from './resume-builder-publications.component';

describe('ResumeBuilderPublicationsComponent', () => {
  let component: ResumeBuilderPublicationsComponent;
  let fixture: ComponentFixture<ResumeBuilderPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilderPublicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeBuilderPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
