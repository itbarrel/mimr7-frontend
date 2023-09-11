import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GptHighlightsComponent } from './gpt-highlights.component';

describe('GptHighlightsComponent', () => {
  let component: GptHighlightsComponent;
  let fixture: ComponentFixture<GptHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GptHighlightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GptHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
