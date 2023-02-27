import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconSelectComponent} from './icon-select/icon-select.component';
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {BrowserModule} from "@angular/platform-browser";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CarouselComponent} from './carousel/carousel.component';
import {MarkerPreviewComponent} from './marker-preview/marker-preview.component';
import { CalendarComponent } from './calendar/calendar.component';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {FlatpickrModule} from "angularx-flatpickr";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import { CalendarEventsComponent } from './calendar/calendar-events/calendar-events.component';
import { CalendarEventComponent } from './calendar/calendar-events/calendar-event/calendar-event.component';


@NgModule({
  declarations: [
    IconSelectComponent,
    CarouselComponent,
    MarkerPreviewComponent,
    CalendarComponent,
    CalendarEventsComponent,
    CalendarEventComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    FormBuilder
  ],
  exports: [
    IconSelectComponent,
    MarkerPreviewComponent,
    CalendarComponent,
    CalendarEventsComponent,
    CalendarEventComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AngularWidgetsModule {
}
