import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionslibraryComponent } from './collectionslibrary.component';

describe('CollectionslibraryComponent', () => {
  let component: CollectionslibraryComponent;
  let fixture: ComponentFixture<CollectionslibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionslibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionslibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
