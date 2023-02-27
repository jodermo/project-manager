import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCalendarEventComponent } from './project-calendar-event.component';

describe('ProjectCalendarEventComponent', () => {
  let component: ProjectCalendarEventComponent;
  let fixture: ComponentFixture<ProjectCalendarEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCalendarEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCalendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
