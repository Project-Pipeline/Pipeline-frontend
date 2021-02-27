import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualUserDetailsPopupComponent } from './individual-user-details-popup.component';

describe('IndividualUserDetailsPopupComponent', () => {
  let component: IndividualUserDetailsPopupComponent;
  let fixture: ComponentFixture<IndividualUserDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualUserDetailsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualUserDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
