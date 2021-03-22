import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPopupComponent } from './modal-popup.component';

describe('ModalPopupComponent', () => {
  let component: ModalPopupComponent<any, any>;
  let fixture: ComponentFixture<ModalPopupComponent<any, any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
