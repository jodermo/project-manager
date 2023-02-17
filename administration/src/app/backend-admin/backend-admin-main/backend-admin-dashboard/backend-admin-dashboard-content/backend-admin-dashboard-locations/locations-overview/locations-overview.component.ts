import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { NgTaskEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.task.entity';
import { NgLocationEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.location.entity';
import { EditLocationComponent } from '../edit-location/edit-location.component';
import { LocationsDatabaseTableComponent } from '../locations-database-table/locations-database-table.component';
import { BackendAdminDashboardLocationsComponent } from '../backend-admin-dashboard-locations.component';

@Component({
  selector: 'app-locations-overview',
  templateUrl: './locations-overview.component.html',
  styleUrls: ['./locations-overview.component.scss']
})
export class LocationsOverviewComponent extends LocationsDatabaseTableComponent implements OnChanges {
  @Input() entries?: NgLocationEntity[];
  renderData: NgLocationEntity[] = [];
  @Input() editComponent?: EditLocationComponent;
  @Input() dashboardComponent?: BackendAdminDashboardLocationsComponent;
  @Input() task?: NgTaskEntity;

  showLocation = false;

  fieldKey = 'locationIds';
  multiple = true;

  locations: NgLocationEntity[] = [];

  @Output() onSave = new EventEmitter<NgLocationEntity>();
  @Output() onDelete = new EventEmitter();
  showMap: any = {};

  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }

  ngOnInit(): void {
    this.getPOIs();
    setTimeout(() => {
      this.ready = true;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.getPOIs();
  }

  getPOIs() {

    if (this.entry && this.fieldKey) {
      if ((this.entry as any)[this.fieldKey]) {
        this.locations = this.adminService.apiData['location'].filter((location: NgLocationEntity) => {
          let exist = false;
          if (this.multiple && (this.entry as any)[this.fieldKey].length) {
            exist = (this.entry as any)[this.fieldKey].find((locationId: number) => locationId === location?.id) !== undefined;
          }
          if (!this.multiple && (this.entry as any)[this.fieldKey]) {
            exist = (this.entry as any)[this.fieldKey] === location.id;
          }
          return exist;
        });
      } else {
        this.locations = [];
      }
      this.editComponent = this.adminService.editLocationComponent;
    } else if (this.task) {
      this.editComponent = this.adminService.editLocationComponent;
    } else {
      this.locations = this.adminService.apiData['location'];
    }
    this.entries = this.locations;

  }


  addNew() {
    if (this.editComponent) {
      this.editComponent.addNew();
    }
  }

  setEditEntry(location: any) {
    if (this.editable) {
      this.editEntry = location;
      if (this.editComponent) {
        this.editComponent.editEntry(location);
      }
    }

  }

  deleteEntry(location: NgLocationEntity) {
    if (this.editable) {
      this.adminService.deleteEntry(location, () => {
        this.getPOIs();
        this.applyFilter();
        this.onDelete.emit();
      });
    }
  }

  toggleLocationMap(location: NgLocationEntity) {
    if (location?.id) {
      if (!this.showMap[location.id]) {
        this.showMap[location.id] = true;
      } else {
        this.showMap[location.id] = false;
      }
    }

  }
}
