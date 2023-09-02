import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightsAddComponent } from './highlights-add.component';

describe('HighlightsAddComponent', () => {
  let component: HighlightsAddComponent;
  let fixture: ComponentFixture<HighlightsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlightsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
