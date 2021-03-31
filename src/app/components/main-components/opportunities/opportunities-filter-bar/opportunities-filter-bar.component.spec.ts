import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesFilterBarComponent } from './opportunities-filter-bar.component';

describe('OpportunitiesFilterBarComponent', () => {
  let component: OpportunitiesFilterBarComponent;
  let fixture: ComponentFixture<OpportunitiesFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunitiesFilterBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitiesFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
      component.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('searchText should be empty string', () => {
      expect(component.searchText).toEqual('');
  });

  it('paid should be false', () => {
      expect(component.paid).toBeFalse();
  });
});
