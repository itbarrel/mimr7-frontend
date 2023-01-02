import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassListActionComponent } from './class-list-action.component';

describe('ClassListActionComponent', () => {
  let component: ClassListActionComponent;
  let fixture: ComponentFixture<ClassListActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassListActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassListActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
