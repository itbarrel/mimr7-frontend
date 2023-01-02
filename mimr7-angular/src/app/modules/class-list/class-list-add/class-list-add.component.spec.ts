import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassListAddComponent } from './class-list-add.component';

describe('ClassListAddComponent', () => {
  let component: ClassListAddComponent;
  let fixture: ComponentFixture<ClassListAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassListAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
