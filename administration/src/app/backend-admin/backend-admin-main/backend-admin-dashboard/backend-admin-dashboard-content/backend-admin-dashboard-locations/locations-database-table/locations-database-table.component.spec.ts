import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDatabaseTableComponent } from './location-database-table.component';

describe('LocationDatabaseTableComponent', () => {
  let component: LocationDatabaseTableComponent;
  let fixture: ComponentFixture<LocationDatabaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationDatabaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDatabaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
