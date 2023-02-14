import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTableFieldTaskEntryComponent } from './database-table-field-task-entry.component';

describe('DatabaseTableFieldTaskEntryComponent', () => {
  let component: DatabaseTableFieldTaskEntryComponent;
  let fixture: ComponentFixture<DatabaseTableFieldTaskEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTableFieldTaskEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTableFieldTaskEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
