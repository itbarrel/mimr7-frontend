import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightslibraryComponent } from './highlightslibrary.component';

describe('HighlightslibraryComponent', () => {
  let component: HighlightslibraryComponent;
  let fixture: ComponentFixture<HighlightslibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlightslibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightslibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
