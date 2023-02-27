import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackendAdminService} from './backend-admin.service';
import {HttpClientModule} from '@angular/common/http';
import {BackendAdminHeaderComponent} from './backend-admin-header/backend-admin-header.component';
import {BackendAdminFooterComponent} from './backend-admin-footer/backend-admin-footer.component';
import {BackendAdminMainComponent} from './backend-admin-main/backend-admin-main.component';
import {BackendAdminComponent} from './backend-admin.component';
import {LoginComponent} from './backend-admin-components/login/login.component';
import {LogoComponent} from './backend-admin-components/logo/logo.component';
import {SidebarComponent} from './backend-admin-components/sidebar/sidebar.component';
import {NavigationComponent} from './backend-admin-components/navigation/navigation.component';
import {MenuComponent} from './backend-admin-components/menu/menu.component';
import {TestDataComponent} from './backend-admin-components/test-data/test-data.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormBuilder, FormsModule} from '@angular/forms';
import {
  BackendAdminJsonDataComponent
} from './backend-admin-main/backend-admin-json-data/backend-admin-json-data.component';
import {
  JsonDataFormComponent
} from './backend-admin-main/backend-admin-json-data/json-data-form/json-data-form.component';
import {
  DialogJsonDataDialog,
  JsonDataComponent
} from './backend-admin-main/backend-admin-json-data/json-data/json-data.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSliderModule} from '@angular/material/slider';
import {
  JsonDataMenuComponent
} from './backend-admin-main/backend-admin-json-data/json-data-menu/json-data-menu.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {TableToolbarComponent} from './backend-admin-components/table-toolbar/table-toolbar.component';
import {
  BackendConfigurationComponent
} from './backend-admin-components/backend-configuration/backend-configuration.component';
import {LoadingScreenComponent} from './backend-admin-components/loading-screen/loading-screen.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ErrorMessageComponent} from './backend-admin-components/error-message/error-message.component';
import {
  LanguageConfigComponent
} from './backend-admin-components/backend-configuration/language-config/language-config.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {
  BackendAdminDashboardComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard.component';
import {
  BackendAdminDashboardNavigationComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-navigation/backend-admin-dashboard-navigation.component';
import {
  BackendAdminDashboardContentComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-content.component';
import {
  BackendAdminDashboardContentDashboardComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-content-dashboard/backend-admin-dashboard-content-dashboard.component';
import {
  BackendAdminDashboardContentAccountComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-content-account/backend-admin-dashboard-content-account.component';
import {DatabaseTableComponent} from './backend-admin-components/database/database-table/database-table.component';
import {
  BackendAdminDashboardLocationsComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-locations/backend-admin-dashboard-locations.component';
import {
  BackendAdminDashboardTasksComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-tasks/backend-admin-dashboard-tasks.component';
import {
  BackendAdminDashboardSettingsComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-settings/backend-admin-dashboard-settings.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {
  DatabaseTableFieldComponent
} from './backend-admin-components/database/database-table/database-table-field/database-table-field.component';
import {
  DatabaseTableLabelComponent
} from './backend-admin-components/database/database-table/database-table-label/database-table-label.component';
import {
  DatabaseTableFieldDataEntryComponent
} from './backend-admin-components/database/database-table/database-table-field/database-table-field-data-entry/database-table-field-data-entry.component';
import {
  DatabaseTableFieldLocationEntryComponent
} from './backend-admin-components/database/database-table/database-table-field/database-table-field-location-entry/database-table-field-location-entry.component';
import {
  DatabaseTableFieldTaskEntryComponent
} from './backend-admin-components/database/database-table/database-table-field/database-table-field-task-entry/database-table-field-task-entry.component';
import {
  DatabaseTableFieldTaskEntriesComponent
} from './backend-admin-components/database/database-table/database-table-field/database-table-field-task-entries/database-table-field-task-entries.component';
import {
  DatabaseTableFieldLocationEntriesComponent
} from './backend-admin-components/database/database-table/database-table-field/database-table-field-location-entries/database-table-field-location-entries.component';
import {
  DatabaseTableFieldDataEntriesComponent
} from './backend-admin-components/database/database-table/database-table-field/database-table-field-data-entries/database-table-field-data-entries.component';

import {LocationsMapComponent} from './backend-admin-components/locations-map/locations-map.component';
import {
  LocationsOverviewComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-locations/locations-overview/locations-overview.component';
import {
  TaskOverviewComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-tasks/task-overview/task-overview.component';
import {ClientDeviceModule} from '../client-device/client-device.module';
import {FileUploadComponent} from './backend-admin-components/file-upload/file-upload.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ActiveReportsModule} from '@grapecity/activereports-angular';
import {FilePreviewComponent} from './backend-admin-components/file-preview/file-preview.component';
import {
  EditTaskComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-tasks/edit-task/edit-task.component';
import {
  EditLocationComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-locations/edit-location/edit-location.component';
import {
  DatabaseOverviewComponent
} from './backend-admin-components/database/database-overview/database-overview.component';
import {
  DatabaseEditEntryComponent
} from './backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import {
  DatabaseDashboardComponent
} from './backend-admin-components/database/database-dashboard/database-dashboard.component';

import {
  TaskDatabaseTableComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-tasks/task-database-table/task-database-table.component';
import {
  LocationsDatabaseTableComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-locations/locations-database-table/locations-database-table.component';
import {
  BackendAdminDashboardCompaniesComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-companies/backend-admin-dashboard-companies.component';

import {
  BackendAdminDashboardFilesComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-files/backend-admin-dashboard-files.component';
import {
  EditCompanyComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-companies/edit-company/edit-company.component';
import {
  EditFileComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-files/edit-file/edit-file.component';

import {
  FilesOverviewComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-files/files-overview/files-overview.component';
import {
  CompaniesOverviewComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-companies/companies-overview/companies-overview.component';
import {BackendSettingsComponent} from './backend-admin-components/backend-settings/backend-settings.component';
import {
  FilesDatabaseTableComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-files/files-database-table/files-database-table.component';
import {
  CompaniesDatabaseTableComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-companies/companies-database-table/companies-database-table.component';
import {GetClientLocationComponent} from './backend-admin-components/get-client-location/get-client-location.component';
import {PreviewFileComponent} from './backend-admin-components/file-preview/preview-file/preview-file.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FileSelectionComponent} from './backend-admin-components/file-selection/file-selection.component';
import {
  DatabaseTableFieldCompanyEntryComponent
} from './backend-admin-components/database/database-table/database-table-field/database-table-field-company-entry/database-table-field-company-entry.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SubTasksPreviewComponent} from './backend-admin-components/sub-tasks-preview/sub-tasks-preview.component';
import {
  BackendAdminDashboardHeaderComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-header/backend-admin-dashboard-header.component';
import {
  BackendAdminDashboardAttributesComponent
} from "./backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-attributes/backend-admin-dashboard-attributes.component";
import {
  EditAttributeComponent
} from "./backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-attributes/edit-attribute/edit-attribute.component";
import {
  AttributeDatabaseTableComponent
} from "./backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-attributes/attribute-database-table/attribute-database-table.component";
import {
  AttributeOverviewComponent
} from "./backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-attributes/attribute-overview/attribute-overview.component";
import {AngularWidgetsModule} from "../angular-widgets/angular-widgets.module";
import {
  DatabaseAttributeComponent
} from './backend-admin-components/database/database-attribute/database-attribute.component';
import {D3ChartModule} from "../d3-chart/d3-chart.module";
import {
  BackendAdminDashboardContentUsersComponent
} from "./backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-content-users/backend-admin-dashboard-content-users.component";
import {
  UsersTableComponent
} from "./backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-content-users/users-table/users-table.component";
import {
  EditUserComponent
} from "./backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-content-users/edit-user/edit-user.component";
import {
  EditUserCompanyComponent
} from "./backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-content-users/edit-user/edit-user-company/edit-user-company.component";
import {AddressComponent} from "./backend-admin-components/address/address.component";
import {
  BackendAdminDashboardTeamsComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-teams/backend-admin-dashboard-teams.component';
import {
  BackendAdminDashboardUserRolesComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-user-roles/backend-admin-dashboard-user-roles.component';
import {
  BackendAdminDashboardUserGroupsComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-user-groups/backend-admin-dashboard-user-groups.component';
import {
  BackendAdminDashboardAddressesComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-addresses/backend-admin-dashboard-addresses.component';
import {
  BackendAdminDashboardProjectsComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-projects/backend-admin-dashboard-projects.component';
import {
  BackendAdminDashboardDataComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-data/backend-admin-dashboard-data.component';
import {
  BackendAdminDashboardContentTasksComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-content-tasks/backend-admin-dashboard-content-tasks.component';
import {
  ProjectCalendarComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-projects/project-calendar/project-calendar.component';
import {
  ProjectCalendarEventsComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-projects/project-calendar/project-calendar-events/project-calendar-events.component';
import {
  ProjectCalendarEventComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-projects/project-calendar/project-calendar-events/project-calendar-event/project-calendar-event.component';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {FlatpickrModule} from "angularx-flatpickr";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    BackendAdminHeaderComponent,
    BackendAdminDashboardHeaderComponent,
    BackendAdminFooterComponent,
    BackendAdminMainComponent,
    BackendAdminComponent,
    LoginComponent,
    LogoComponent,
    SidebarComponent,
    NavigationComponent,
    MenuComponent,
    TestDataComponent,
    BackendAdminJsonDataComponent,
    JsonDataFormComponent,
    DialogJsonDataDialog,
    JsonDataComponent,
    JsonDataMenuComponent,
    TableToolbarComponent,
    BackendConfigurationComponent,
    LoadingScreenComponent,
    ErrorMessageComponent,
    LanguageConfigComponent,
    BackendAdminDashboardComponent,
    BackendAdminDashboardNavigationComponent,
    BackendAdminDashboardContentComponent,
    BackendAdminDashboardContentDashboardComponent,
    BackendAdminDashboardContentAccountComponent,
    DatabaseTableComponent,
    BackendAdminDashboardLocationsComponent,
    BackendAdminDashboardTasksComponent,
    BackendAdminDashboardSettingsComponent,
    DatabaseTableFieldComponent,
    DatabaseTableLabelComponent,
    DatabaseTableFieldDataEntryComponent,
    DatabaseTableFieldLocationEntryComponent,
    DatabaseTableFieldTaskEntryComponent,
    DatabaseTableFieldTaskEntriesComponent,
    DatabaseTableFieldLocationEntriesComponent,
    DatabaseTableFieldDataEntriesComponent,
    LocationsMapComponent,
    LocationsOverviewComponent,
    TaskOverviewComponent,
    TaskDatabaseTableComponent,
    LocationsDatabaseTableComponent,
    FileUploadComponent,
    FilePreviewComponent,
    EditTaskComponent,
    EditLocationComponent,
    DatabaseOverviewComponent,
    DatabaseEditEntryComponent,
    DatabaseDashboardComponent,
    BackendAdminDashboardCompaniesComponent,
    BackendAdminDashboardFilesComponent,
    EditCompanyComponent,
    EditFileComponent,
    FilesOverviewComponent,
    CompaniesOverviewComponent,
    BackendSettingsComponent,
    FilesDatabaseTableComponent,
    CompaniesDatabaseTableComponent,
    GetClientLocationComponent,
    PreviewFileComponent,
    FileSelectionComponent,
    DatabaseTableFieldCompanyEntryComponent,
    SubTasksPreviewComponent,
    BackendAdminDashboardAttributesComponent,
    EditAttributeComponent,
    AttributeDatabaseTableComponent,
    AttributeOverviewComponent,
    DatabaseAttributeComponent,
    BackendAdminDashboardContentUsersComponent,
    UsersTableComponent,
    EditUserComponent,
    EditUserCompanyComponent,
    AddressComponent,
    BackendAdminDashboardTeamsComponent,
    BackendAdminDashboardUserRolesComponent,
    BackendAdminDashboardUserGroupsComponent,
    BackendAdminDashboardAddressesComponent,
    BackendAdminDashboardProjectsComponent,
    BackendAdminDashboardDataComponent,
    BackendAdminDashboardContentTasksComponent,
    ProjectCalendarComponent,
    ProjectCalendarEventsComponent,
    ProjectCalendarEventComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularWidgetsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSliderModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatPaginatorModule,
    MatGridListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ClientDeviceModule,
    NgxDropzoneModule,
    ActiveReportsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    D3ChartModule,
    CalendarModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [
    BackendAdminComponent,
    FormsModule,
    LoginComponent
  ],
  providers: [
    BackendAdminService,
    FormBuilder
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BackendAdminModule {
}
