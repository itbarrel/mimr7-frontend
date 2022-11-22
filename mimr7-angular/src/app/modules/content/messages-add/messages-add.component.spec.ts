import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesAddComponent } from './messages-add.component';

describe('MessagesAddComponent', () => {
  let component: MessagesAddComponent;
  let fixture: ComponentFixture<MessagesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
