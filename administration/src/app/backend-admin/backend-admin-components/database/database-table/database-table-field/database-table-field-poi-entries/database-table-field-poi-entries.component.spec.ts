import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTableFieldPoiEntriesComponent } from './database-table-field-poi-entries.component';

describe('DatabaseTableFieldPoiEntriesComponent', () => {
  let component: DatabaseTableFieldPoiEntriesComponent;
  let fixture: ComponentFixture<DatabaseTableFieldPoiEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTableFieldPoiEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTableFieldPoiEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
