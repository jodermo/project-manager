import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseEditEntryComponent } from './database-edit-entry.component';

describe('DatabaseEditEntryComponent', () => {
  let component: DatabaseEditEntryComponent;
  let fixture: ComponentFixture<DatabaseEditEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseEditEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseEditEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
