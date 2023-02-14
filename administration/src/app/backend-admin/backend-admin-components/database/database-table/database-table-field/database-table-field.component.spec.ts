import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseTableFieldComponent } from './database-table-field.component';

describe('DatabaseTableFieldComponent', () => {
  let component: DatabaseTableFieldComponent;
  let fixture: ComponentFixture<DatabaseTableFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseTableFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseTableFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
