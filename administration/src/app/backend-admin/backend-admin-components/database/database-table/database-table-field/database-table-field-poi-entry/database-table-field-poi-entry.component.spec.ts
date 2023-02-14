import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTableFieldPoiEntryComponent } from './database-table-field-poi-entry.component';

describe('DatabaseTableFieldPoiEntryComponent', () => {
  let component: DatabaseTableFieldPoiEntryComponent;
  let fixture: ComponentFixture<DatabaseTableFieldPoiEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTableFieldPoiEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTableFieldPoiEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
