import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralHubBaseComponent } from './central-hub-base.component';

describe('CentralHubBaseComponent', () => {
  let component: CentralHubBaseComponent;
  let fixture: ComponentFixture<CentralHubBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralHubBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralHubBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
