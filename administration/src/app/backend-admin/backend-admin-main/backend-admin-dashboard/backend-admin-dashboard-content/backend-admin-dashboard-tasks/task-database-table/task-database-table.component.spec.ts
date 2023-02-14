import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDatabaseTableComponent } from './task-database-table.component';

describe('TaskDatabaseTableComponent', () => {
  let component: TaskDatabaseTableComponent;
  let fixture: ComponentFixture<TaskDatabaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDatabaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDatabaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
