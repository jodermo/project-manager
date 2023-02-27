import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CalendarEvent, CalendarService} from "../../../../../../angular-widgets/calendar/calendar.service";
import {CalendarComponent} from "../../../../../../angular-widgets/calendar/calendar.component";
import {BackendAdminService} from "../../../../../backend-admin.service";
import {CalendarEventAction} from "angular-calendar";
import {NgProjectEntity} from "../../../../../../../../../angular-classes/angular-entities/ng.project.entity";
import {addDays, startOfDay, subDays} from "date-fns";


@Component({
  selector: 'app-project-calendar',
  templateUrl: './project-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./project-calendar.component.scss']
})
export class ProjectCalendarComponent extends CalendarComponent implements OnChanges {

  @Input() projects: NgProjectEntity[] = [];

  showList = true;

  projectIds: number[] = [];
  events: CalendarEvent[] = [];
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  constructor(calendar: CalendarService, public adminService: BackendAdminService) {
    super(calendar);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadProjects();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadProjects(true);
  }

  loadProjects(clear = false) {
    if (clear) {
      this.events = [];
      this.projectIds = [];
    }
    for (const project of this.projects) {
      this.createEvent(project);
    }
    this.calendar.events = this.events;
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.calendar.handleEvent(action, event);
    this.showList = true;
  }

  createEvent(project: NgProjectEntity) {
    if (project.id && project.startDate && !this.projectIds.find(id => project.id === id)) {
      this.projectIds.push(project.id);
      const event = {
        start: subDays(startOfDay(new Date(project.startDate)), 1),
        end: project.endDate ? addDays(new Date(project.endDate), 1) : undefined,
        title: project.title,
        color: {
          primary: project.primaryColor || '#ff0000',
          secondary: project.secondaryColor || '#ffffff',
          secondaryText: project.secondaryTextColor || '#000000'
        },
        actions: this.actions,
        allDay: project.allDay || true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
        data: project,
      } as CalendarEvent;
      this.events.push(event);
    }

  }
}
