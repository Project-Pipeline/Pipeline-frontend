import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityUserDetailsPopupComponent } from './entity-user-details-popup.component';

describe('EntityUserDetailsPopupComponent', () => {
  let component: EntityUserDetailsPopupComponent;
  let fixture: ComponentFixture<EntityUserDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityUserDetailsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityUserDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
