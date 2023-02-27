import {Component, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {
  CalendarEventsComponent
} from "../../../../../../../angular-widgets/calendar/calendar-events/calendar-events.component";
import {BackendAdminService} from "../../../../../../backend-admin.service";
import {CalendarEvent, CalendarService} from "../../../../../../../angular-widgets/calendar/calendar.service";
import {MatAccordion} from "@angular/material/expansion";
import {NgProjectEntity} from "../../../../../../../../../../angular-classes/angular-entities/ng.project.entity";

@Component({
  selector: 'app-project-calendar-events',
  templateUrl: './project-calendar-events.component.html',
  styleUrls: ['./project-calendar-events.component.scss']
})
export class ProjectCalendarEventsComponent extends CalendarEventsComponent implements OnChanges {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  loading = false;

  constructor(calendar: CalendarService, public adminService: BackendAdminService) {
    super(calendar);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  saveEvent(event: CalendarEvent) {
    const project = (event.data as NgProjectEntity);
    project.title = event.title;
    project.startDate = event.start;
    project.endDate = event.end;
    project.primaryColor = event.color && event.color.primary? event.color.primary : '#ff0000';
    project.primaryColor = event.color && event.color.secondary ? event.color.secondary : '#ffffff';
    project.secondaryTextColor = event.color && event.color.secondaryText ? event.color.secondaryText : '#000000';
    project.allDay = event.allDay || true;
    project.update();
  }

  deleteEvent(event: CalendarEvent) {
    const project = (event.data as NgProjectEntity);
    this.adminService.deleteEntry(project, () => {
      this.adminService.loadProjects();
    });
  }

  addEvent(): void {
    const newProject = new NgProjectEntity(this.adminService);
    this.loading = true;
    newProject.add(() => {
      this.adminService.loadProjects(() => {
        this.loading = false;
        this.calendar.viewDate = newProject.startDate;
      });
    }, () => {
      this.loading = false;
    });
  }
}
