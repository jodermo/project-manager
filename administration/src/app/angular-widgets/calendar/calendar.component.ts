import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import {CalendarService} from "./calendar.service";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {


  constructor(public calendar: CalendarService) {

  }

  ngOnInit() {
    if (!this.calendar.events) {
      this.calendar.events = this.calendar.exampleEvents;
    }
  }

}
