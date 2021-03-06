import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostPopupComponent } from './add-post-popup.component';

describe('AddPostPopupComponent', () => {
  let component: AddPostPopupComponent;
  let fixture: ComponentFixture<AddPostPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
