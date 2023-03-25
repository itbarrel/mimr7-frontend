import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassActionsComponent } from './class-actions.component';

describe('ClassActionsComponent', () => {
  let component: ClassActionsComponent;
  let fixture: ComponentFixture<ClassActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
