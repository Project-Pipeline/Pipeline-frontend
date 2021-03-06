import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSummaryCardComponent } from './post-summary-card.component';

describe('PostSummaryComponent', () => {
  let component: PostSummaryCardComponent;
  let fixture: ComponentFixture<PostSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostSummaryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
