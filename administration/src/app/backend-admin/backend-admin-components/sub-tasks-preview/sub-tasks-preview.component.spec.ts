import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTasksPreviewComponent } from './sub-tasks-preview.component';

describe('SubTasksPreviewComponent', () => {
  let component: SubTasksPreviewComponent;
  let fixture: ComponentFixture<SubTasksPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTasksPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTasksPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
