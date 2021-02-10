import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPairEditorComponent } from './text-pair-editor.component';

describe('TextPairEditorComponent', () => {
  let component: TextPairEditorComponent;
  let fixture: ComponentFixture<TextPairEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextPairEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPairEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
