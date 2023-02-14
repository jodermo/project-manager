import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTableFieldDataEntryComponent } from './database-table-field-data-entry.component';

describe('DatabaseTableFieldDataEntryComponent', () => {
  let component: DatabaseTableFieldDataEntryComponent;
  let fixture: ComponentFixture<DatabaseTableFieldDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTableFieldDataEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTableFieldDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
