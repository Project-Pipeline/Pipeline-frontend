import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralHubComponent } from './central-hub.component';

describe('CentralHubComponent', () => {
  let component: CentralHubComponent;
  let fixture: ComponentFixture<CentralHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
