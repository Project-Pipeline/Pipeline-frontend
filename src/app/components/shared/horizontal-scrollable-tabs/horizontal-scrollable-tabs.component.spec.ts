import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalScrollableTabsComponent } from './horizontal-scrollable-tabs.component';

describe('HorizontalScrollableTabsComponent', () => {
  let component: HorizontalScrollableTabsComponent;
  let fixture: ComponentFixture<HorizontalScrollableTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalScrollableTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalScrollableTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
