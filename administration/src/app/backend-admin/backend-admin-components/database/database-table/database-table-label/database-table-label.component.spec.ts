import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTableLabelComponent } from './database-table-label.component';

describe('DatabaseTableLabelComponent', () => {
  let component: DatabaseTableLabelComponent;
  let fixture: ComponentFixture<DatabaseTableLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTableLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTableLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
