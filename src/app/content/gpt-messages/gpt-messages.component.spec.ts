import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GptMessagesComponent } from './gpt-messages.component';

describe('GptMessagesComponent', () => {
  let component: GptMessagesComponent;
  let fixture: ComponentFixture<GptMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GptMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GptMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
