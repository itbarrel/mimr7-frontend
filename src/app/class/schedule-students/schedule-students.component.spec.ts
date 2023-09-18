import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleStudentsComponent } from './schedule-students.component';

describe('ScheduleStudentsComponent', () => {
  let component: ScheduleStudentsComponent;
  let fixture: ComponentFixture<ScheduleStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
