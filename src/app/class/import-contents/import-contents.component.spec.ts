import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContentsComponent } from './import-contents.component';

describe('ImportContentsComponent', () => {
  let component: ImportContentsComponent;
  let fixture: ComponentFixture<ImportContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
