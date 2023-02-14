import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BackendAdminService } from '../../../backend-admin.service';
import { NgMemoEntity } from '../../../../../../../angular-classes/angular-entities/ng.memo.entity';
import { NgAppSettingsEntity } from '../../../../../../../angular-classes/angular-entities/ng.app-settings.entity';
import { NgLanguageEntity } from '../../../../../../../angular-classes/angular-entities/ng.language.entity';
import { NgLocationEntity } from '../../../../../../../angular-classes/angular-entities/ng.location.entity';
import { NgPoiEntity } from '../../../../../../../angular-classes/angular-entities/ng.poi.entity';
import { NgTaskEntity } from '../../../../../../../angular-classes/angular-entities/ng.task.entity';
import { NgTranslationEntity } from '../../../../../../../angular-classes/angular-entities/ng.translation.entity';
import { NgUserEntity } from '../../../../../../../angular-classes/angular-entities/ng.user.entity';
import { NgUserGroupEntity } from '../../../../../../../angular-classes/angular-entities/ng.user-group.entity';
import { NgUserRoleEntity } from '../../../../../../../angular-classes/angular-entities/ng.user-role.entity';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgApiEntity } from '../../../../../../../angular-classes/ng.api.entity';
import { DatabaseEditEntryComponent } from '../database-edit-entry/database-edit-entry.component';
import { NgFileEntity } from '../../../../../../../angular-classes/angular-entities/ng.file.entity';
import { NgCompanyEntity } from '../../../../../../../angular-classes/angular-entities/ng.company.entity';

export interface FilterKey {
  name: string;
  values: string[];
}

@Component({
  selector: 'app-database-table',
  templateUrl: './database-table.component.html',
  styleUrls: ['./database-table.component.scss']
})
export class DatabaseTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() apiRoute?: string;
  @Input() dataSource?: MatTableDataSource<any>;
  @Input() entries?: NgApiEntity[];
  @Input() entry?: NgApiEntity;
  @Input() fieldKey?: string;
  @Input() displayedColumns?: string[];
  @Input() paginator?: MatPaginator;
  @Input() sort?: MatSort;
  @Input() pageSizeOptions = [10, 25, 50, 100, 200, 500, 1000];
  @Input() filterInput?: any;
  @Input() editable = true;
  @Input() edit = false;
  @Input() editComponent?: DatabaseEditEntryComponent;

  renderData: NgApiEntity[] = [];

  ready = false;
  loading = false;
  @Input() editEntry: any;

  customData = false;
  @Input() showOptions = false;
  private filterValue?: string;

  constructor(public adminService: BackendAdminService) {
    adminService.on('updated-entity', (entity: NgApiEntity) => {
      if (entity.apiRoute === this.apiRoute) {
        console.log('DatabaseTableComponent updated-entity', entity);
        this.ngOnChanges({entries: this.adminService.apiData[this.apiRoute]});
      }
    });
    adminService.on('loaded-entity', (entity: NgApiEntity) => {
      if (entity.apiRoute === this.apiRoute) {
        console.log('DatabaseTableComponent loaded-entity', entity);
        this.ngOnChanges({entries: this.adminService.apiData[this.apiRoute]});
      }
    });
  }

  loadData() {
    const customData = this.getCustomData();
    return customData;
  }

  ngOnInit(): void {
    const customData = this.loadData();
    if (!customData) {
      if (!this.entries) {
        this.loadAllEntries();
      } else {
        this.initData(this.entries);
      }
    }
    if (!this.displayedColumns) {
      this.loadDefaultColumns();
    }
    this.ready = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadData();
  }


  getCustomData(): any {
    return undefined;
  }

  loadAllEntries() {

    if (this.apiRoute) {
      this.loading = true;
      this.adminService.get(this.apiRoute, (result: any[]) => {
        result = this.parseResult(result);
        this.initData(result);
        this.loading = false;
      }, (error: any) => {
        this.showError(error);
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  initData(entries = this.entries) {
    this.entries = entries;
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource(this.entries);
    } else if (this.entries) {
      this.dataSource.data = this.entries;
    } else {
      this.dataSource.data = [];
    }
    this.applyFilter();
  }

  parseResult(result: any[]) {
    const parsedData: any[] = [];
    if (result && result.length) {
      for (const entry of result) {
        if (this.apiRoute === 'app-setting') {
          parsedData.push(new NgAppSettingsEntity(this.adminService).setData(entry));
        } else if (this.apiRoute === 'language') {
          parsedData.push(new NgLanguageEntity(this.adminService).setData(entry));
        } else if (this.apiRoute === 'location') {
          parsedData.push(new NgLocationEntity(this.adminService).setData(entry));
        } else if (this.apiRoute === 'memo') {
          parsedData.push(new NgMemoEntity(this.adminService).setData(entry));
        } else if (this.apiRoute === 'poi') {
          parsedData.push(new NgPoiEntity(this.adminService).setData(entry));
        }else if (this.apiRoute === 'task') {
          parsedData.push(new NgTaskEntity(this.adminService).setData(entry));
        } else if (this.apiRoute === 'translation') {
          parsedData.push(new NgTranslationEntity(this.adminService).setData(entry));
        } else if (this.apiRoute === 'user') {
          parsedData.push(new NgUserEntity(this.adminService).setData(entry));
        } else if (this.apiRoute === 'file') {
          parsedData.push(new NgFileEntity(this.adminService).setData(entry));
        }  else if (this.apiRoute === 'company') {
          parsedData.push(new NgCompanyEntity(this.adminService).setData(entry));
        } else if (this.apiRoute === 'user-group') {
          parsedData.push(new NgUserGroupEntity(this.adminService).setData(entry));
        } else if (this.apiRoute === 'user-role') {
          parsedData.push(new NgUserRoleEntity(this.adminService).setData(entry));
        } else {
          parsedData.push(entry);
        }
      }
    }

    return parsedData;

  }

  showError(error: any) {
    console.log('showError', error);
  }


  ngAfterViewInit() {
    this.afterInit();
    this.applyFilter();
  }

  afterInit(){

  }

  initSorting() {

    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = this.adminService.text('Max.');

    }
    if (this.dataSource && this.sort) {
      this.dataSource.sort = this.sort;
    }

  }

  applyFilter(event?: Event) {
    this.initSorting();
    if (event) {
      this.filterValue = (event.target as HTMLInputElement).value;
    }
    if (this.dataSource && this.filterValue) {
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
    } else if (this.dataSource) {
      this.dataSource.filter = '';
    }
    if (this.dataSource) {
      if (this.dataSource && (this.dataSource as any)._renderData && (this.dataSource as any)._renderData.value) {
        this.renderData = (this.dataSource as any)._renderData.value;
      }
    }

  }

  private loadDefaultColumns() {
    this.displayedColumns = [];
    let object: any = {};
    if (this.apiRoute === 'app-setting') {
      object = new NgAppSettingsEntity(this.adminService).data();
    } else if (this.apiRoute === 'language') {
      object = new NgLanguageEntity(this.adminService).data();
    } else if (this.apiRoute === 'location') {
      object = new NgLocationEntity(this.adminService).data();
    } else if (this.apiRoute === 'memo') {
      object = new NgMemoEntity(this.adminService).data();
    } else if (this.apiRoute === 'poi') {
      object = new NgPoiEntity(this.adminService).data();
    }  else if (this.apiRoute === 'task') {
      object = new NgTaskEntity(this.adminService).data();
    } else if (this.apiRoute === 'file') {
      object = new NgFileEntity(this.adminService).data();
    }  else if (this.apiRoute === 'company') {
      object = new NgCompanyEntity(this.adminService).data();
    } else if (this.apiRoute === 'translation') {
      object = new NgTranslationEntity(this.adminService).data();
    } else if (this.apiRoute === 'user') {
      object = new NgUserEntity(this.adminService).data();
    } else if (this.apiRoute === 'user-group') {
      object = new NgUserGroupEntity(this.adminService).data();
    } else if (this.apiRoute === 'user-role') {
      object = new NgUserRoleEntity(this.adminService).data();
    }
    for (const key in object) {
      this.displayedColumns.push(key);
    }

  }

  newEntry() {
    if (this.apiRoute === 'app-setting') {
      this.editEntry = new NgAppSettingsEntity(this.adminService);
    } else if (this.apiRoute === 'language') {
      this.editEntry = new NgLanguageEntity(this.adminService);
    } else if (this.apiRoute === 'location') {
      this.editEntry = new NgLocationEntity(this.adminService);
    } else if (this.apiRoute === 'memo') {
      this.editEntry = new NgMemoEntity(this.adminService);
    } else if (this.apiRoute === 'poi') {
      this.editEntry = new NgPoiEntity(this.adminService);
    }  else if (this.apiRoute === 'task') {
      this.editEntry = new NgTaskEntity(this.adminService);
    } else if (this.apiRoute === 'file') {
      this.editEntry = new NgFileEntity(this.adminService);
    } else if (this.apiRoute === 'company') {
      this.editEntry = new NgCompanyEntity(this.adminService);
    } else if (this.apiRoute === 'translation') {
      this.editEntry = new NgTranslationEntity(this.adminService);
    } else if (this.apiRoute === 'user') {
      this.editEntry = new NgUserEntity(this.adminService);
    } else if (this.apiRoute === 'user-group') {
      this.editEntry = new NgUserGroupEntity(this.adminService);
    } else if (this.apiRoute === 'user-role') {
      this.editEntry = new NgUserRoleEntity(this.adminService);
    }
    if (this.editComponent) {
      this.editComponent.editEntry(this.editEntry);
    }
  }

  saveEntry() {
    if (this.editEntry) {
      this.loading = true;
      if (!this.editEntry.id) {
        this.editEntry.add(() => {
          this.loadAllEntries();
          this.editEntry = undefined;
        }, () => {
          this.loading = false;
        });
      } else {
        this.editEntry.update(() => {
          this.loading = false;
        }, () => {
          this.loading = false;
        });
      }
    }
  }
}

