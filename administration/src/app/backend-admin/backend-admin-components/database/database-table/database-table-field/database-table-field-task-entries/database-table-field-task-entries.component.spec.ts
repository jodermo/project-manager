import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTableFieldTaskEntriesComponent } from './database-table-field-task-entries.component';

describe('DatabaseTableFieldTaskEntriesComponent', () => {
  let component: DatabaseTableFieldTaskEntriesComponent;
  let fixture: ComponentFixture<DatabaseTableFieldTaskEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTableFieldTaskEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTableFieldTaskEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
