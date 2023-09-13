import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedScheduleComponent } from './completed-schedule.component';

describe('CompletedScheduleComponent', () => {
  let component: CompletedScheduleComponent;
  let fixture: ComponentFixture<CompletedScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
