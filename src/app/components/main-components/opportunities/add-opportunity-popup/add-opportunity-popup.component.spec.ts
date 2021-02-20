import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOpportunityPopupComponent } from './add-opportunity-popup.component';

describe('AddOpportunityPopupComponent', () => {
  let component: AddOpportunityPopupComponent;
  let fixture: ComponentFixture<AddOpportunityPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOpportunityPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOpportunityPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
