import {Component, TemplateRef, ViewChild} from '@angular/core';
import {
  CalendarEventComponent
} from "../../../../../../../../angular-widgets/calendar/calendar-events/calendar-event/calendar-event.component";
import {CalendarService} from "../../../../../../../../angular-widgets/calendar/calendar.service";
import {BackendAdminService} from "../../../../../../../backend-admin.service";

@Component({
  selector: 'app-project-calendar-event',
  templateUrl: './project-calendar-event.component.html',
  styleUrls: ['./project-calendar-event.component.scss']
})
export class ProjectCalendarEventComponent extends CalendarEventComponent {
  @ViewChild('modalContent', {static: true}) modalContent?: TemplateRef<any>;


  constructor(calendar: CalendarService, public adminService: BackendAdminService) {
    super(calendar);
  }

  ngOnInit() {
    if (this.modalContent?.elementRef) {
      this.calendar.modalContent = this.modalContent;
    }
  }

  close() {
    this.calendar.currentEvent = undefined;
  }
}
