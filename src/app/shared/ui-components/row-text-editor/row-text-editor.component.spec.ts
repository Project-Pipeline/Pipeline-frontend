import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowTextEditorComponent } from './row-text-editor.component';

describe('RowTextEditorComponent', () => {
  let component: RowTextEditorComponent;
  let fixture: ComponentFixture<RowTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowTextEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RowTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
