import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrganizationComponent } from './account-organization.component';

describe('AccountOrganizationComponent', () => {
  let component: AccountOrganizationComponent;
  let fixture: ComponentFixture<AccountOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
