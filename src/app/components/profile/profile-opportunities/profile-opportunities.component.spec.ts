import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOpportunitiesComponent } from './profile-opportunities.component';

describe('ProfileOpportunitiesComponent', () => {
  let component: ProfileOpportunitiesComponent;
  let fixture: ComponentFixture<ProfileOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOpportunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
