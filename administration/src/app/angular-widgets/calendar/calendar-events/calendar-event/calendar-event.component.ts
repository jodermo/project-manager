import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarService} from "../../calendar.service";

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss']
})
export class CalendarEventComponent implements OnInit {
  @ViewChild('modalContent', {static: true}) modalContent?: TemplateRef<any>;

  constructor(public calendar: CalendarService) { }

  ngOnInit() {
    if (this.modalContent?.elementRef) {
      this.calendar.modalContent = this.modalContent;
    }
  }
}
