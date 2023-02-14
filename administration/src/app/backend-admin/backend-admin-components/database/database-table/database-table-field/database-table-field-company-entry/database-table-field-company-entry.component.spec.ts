import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTableFieldCompanyEntryComponent } from './database-table-field-company-entry.component';

describe('DatabaseTableFieldCompanyEntryComponent', () => {
  let component: DatabaseTableFieldCompanyEntryComponent;
  let fixture: ComponentFixture<DatabaseTableFieldCompanyEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTableFieldCompanyEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTableFieldCompanyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
