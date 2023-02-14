import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { NgTaskEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.task.entity';
import { NgMemoEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.memo.entity';
import { NgPoiEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.poi.entity';
import { EditPoiComponent } from '../edit-poi/edit-poi.component';
import { PoiDatabaseTableComponent } from '../poi-database-table/poi-database-table.component';
import { BackendAdminDashboardPoisComponent } from '../backend-admin-dashboard-pois.component';

@Component({
  selector: 'app-poi-overview',
  templateUrl: './poi-overview.component.html',
  styleUrls: ['./poi-overview.component.scss']
})
export class PoiOverviewComponent extends PoiDatabaseTableComponent implements OnChanges {
  @Input() entries?: NgPoiEntity[];
  renderData: NgPoiEntity[] = [];
  @Input() editComponent?: EditPoiComponent;
  @Input() dashboardComponent?: BackendAdminDashboardPoisComponent;
  @Input() task?: NgTaskEntity;
  @Input() memo?: NgMemoEntity;

  showPoi = false;

  fieldKey = 'poiIds';
  multiple = true;

  pois: NgPoiEntity[] = [];

  @Output() onSave = new EventEmitter<NgPoiEntity>();
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
        this.pois = this.adminService.apiData['poi'].filter((poi: NgPoiEntity) => {
          let exist = false;
          if (this.multiple && (this.entry as any)[this.fieldKey].length) {
            exist = (this.entry as any)[this.fieldKey].find((poiId: number) => poiId === poi?.id) !== undefined;
          }
          if (!this.multiple && (this.entry as any)[this.fieldKey]) {
            exist = (this.entry as any)[this.fieldKey] === poi.id;
          }
          return exist;
        });
      } else {
        this.pois = [];
      }
      this.editComponent = this.adminService.editPoiComponent;
    } else if (this.task) {
      this.pois = this.adminService.apiData['poi'].filter((poi: NgPoiEntity) => {
        let exist = false;
        if (this.task && this.task.poiIds?.length) {
          exist = this.task.poiIds.find((poiId: number) => poiId === poi?.id) !== undefined;
        }
        if (this.task && this.task.poiId) {
          exist = this.task.poiId === poi.id;
        }
        return exist;
      });
      this.editComponent = this.adminService.editPoiComponent;
    } else if (this.memo) {
      this.pois = this.adminService.apiData['poi'].filter((poi: NgPoiEntity) => {
        let exist = false;
        if (this.memo && this.memo.poiIds?.length) {
          exist = this.memo.poiIds.find((poiId: number) => poiId === poi?.id) !== undefined;
        }
        if (this.memo && this.memo.poiId) {
          exist = this.memo.poiId === poi.id;
        }
        return exist;
      });
      this.editComponent = this.adminService.editPoiComponent;
    } else {
      this.pois = this.adminService.apiData['poi'];
    }
    this.entries = this.pois;

  }


  addNew() {
    if (this.editComponent) {
      this.editComponent.addNew();
    }
  }

  setEditEntry(poi: any) {
    if (this.editable) {
      this.editEntry = poi;
      if (this.editComponent) {
        this.editComponent.editEntry(poi);
      }
    }

  }

  deleteEntry(poi: NgPoiEntity) {
    if (this.editable) {
      this.adminService.deleteEntry(poi, () => {
        this.getPOIs();
        this.applyFilter();
        this.onDelete.emit();
      });
    }
  }

  togglePoiMap(poi: NgPoiEntity) {
    if (poi?.id) {
      if (!this.showMap[poi.id]) {
        this.showMap[poi.id] = true;
      } else {
        this.showMap[poi.id] = false;
      }
    }

  }
}
