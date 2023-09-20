import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAnswerComponent } from './students-answer.component';

describe('StudentsAnswerComponent', () => {
  let component: StudentsAnswerComponent;
  let fixture: ComponentFixture<StudentsAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
