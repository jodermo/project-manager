import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTableFieldLocationEntryComponent } from './database-table-field-location-entry.component';

describe('DatabaseTableFieldLocationEntryComponent', () => {
  let component: DatabaseTableFieldLocationEntryComponent;
  let fixture: ComponentFixture<DatabaseTableFieldLocationEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTableFieldLocationEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTableFieldLocationEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
