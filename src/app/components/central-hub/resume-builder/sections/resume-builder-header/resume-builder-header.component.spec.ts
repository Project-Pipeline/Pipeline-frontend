import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderHeaderComponent } from './resume-builder-header.component';

describe('ResumeBuilderHeaderComponent', () => {
  let component: ResumeBuilderHeaderComponent;
  let fixture: ComponentFixture<ResumeBuilderHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilderHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeBuilderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
