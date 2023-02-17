import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTableFieldLocationEntriesComponent } from './database-table-field-location-entries.component';

describe('DatabaseTableFieldLocationEntriesComponent', () => {
  let component: DatabaseTableFieldLocationEntriesComponent;
  let fixture: ComponentFixture<DatabaseTableFieldLocationEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTableFieldLocationEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTableFieldLocationEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
