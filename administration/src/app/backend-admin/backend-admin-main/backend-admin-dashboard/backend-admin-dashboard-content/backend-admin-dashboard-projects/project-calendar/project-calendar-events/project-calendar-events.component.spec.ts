import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCalendarEventsComponent } from './project-calendar-events.component';

describe('ProjectCalendarEventsComponent', () => {
  let component: ProjectCalendarEventsComponent;
  let fixture: ComponentFixture<ProjectCalendarEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCalendarEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCalendarEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
