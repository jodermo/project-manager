import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTableFieldDataEntriesComponent } from './database-table-field-data-entries.component';

describe('DatabaseTableFieldDataEntriesComponent', () => {
  let component: DatabaseTableFieldDataEntriesComponent;
  let fixture: ComponentFixture<DatabaseTableFieldDataEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTableFieldDataEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTableFieldDataEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
