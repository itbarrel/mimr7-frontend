import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrganizationAddComponent } from './account-organization-add.component';

describe('AccountOrganizationAddComponent', () => {
  let component: AccountOrganizationAddComponent;
  let fixture: ComponentFixture<AccountOrganizationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOrganizationAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOrganizationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
