import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionslibraryAddComponent } from './collectionslibrary-add.component';

describe('CollectionslibraryAddComponent', () => {
  let component: CollectionslibraryAddComponent;
  let fixture: ComponentFixture<CollectionslibraryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionslibraryAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionslibraryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
