import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAutoCompleterComponent } from './address-auto-completer.component';

describe('AddressAutoCompleterComponent', () => {
  let component: AddressAutoCompleterComponent;
  let fixture: ComponentFixture<AddressAutoCompleterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressAutoCompleterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressAutoCompleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
