import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightslibraryAddComponent } from './highlightslibrary-add.component';

describe('HighlightslibraryAddComponent', () => {
  let component: HighlightslibraryAddComponent;
  let fixture: ComponentFixture<HighlightslibraryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlightslibraryAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightslibraryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
