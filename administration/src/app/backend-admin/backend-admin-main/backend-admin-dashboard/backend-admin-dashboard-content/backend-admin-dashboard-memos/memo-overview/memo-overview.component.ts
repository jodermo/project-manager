import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { NgMemoEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.memo.entity';
import { NgTaskEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.task.entity';
import { NgPoiEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.poi.entity';
import { EditMemoComponent } from '../edit-memo/edit-memo.component';
import { MemoDatabaseTableComponent } from '../memo-database-table/memo-database-table.component';
import { DatabaseEditEntryComponent } from '../../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';

@Component({
  selector: 'app-memo-overview',
  templateUrl: './memo-overview.component.html',
  styleUrls: ['./memo-overview.component.scss']
})
export class MemoOverviewComponent extends MemoDatabaseTableComponent implements OnChanges {
  @ViewChild('overviewEditComponent', {static: false}) overviewEditComponent?: DatabaseEditEntryComponent;
  @Input() entries?: NgMemoEntity[];
  renderData: NgMemoEntity[] = [];
  showPaginator = false;
  @Input() editComponent?: EditMemoComponent;
  @Input() task?: NgTaskEntity;
  @Input() poi?: NgPoiEntity;
  showMemo = false;
  @Input() memos: NgMemoEntity[] = [];

  @Output() onSave = new EventEmitter<NgMemoEntity>();
  @Output() onDelete = new EventEmitter();

  constructor(public adminService: BackendAdminService) {
    super(adminService);
  }

  ngOnInit(): void {
    this.getMemos();
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.getMemos();
  }

  getMemos() {
    this.loading = true;
    if (this.task) {
      this.memos = this.adminService.apiData['memo'].filter((memo: NgMemoEntity) => {
        if (memo.taskIds?.length && this.task) {
          const exists = memo.taskIds.find((taskId: number) => taskId === this.task?.id);
          return !!(exists);
        }
        return false;
      });
      this.showPaginator = true;
      this.editComponent = this.adminService.editMemoComponent;
    } else if (this.poi) {
      this.memos = this.adminService.apiData['memo'].filter((memo: NgMemoEntity) => {
        let exist = false;
        if (memo.poiIds?.length) {
          if (memo.poiIds.find((taskId: number) => taskId === this.task?.id) !== undefined) {
            exist = true;
          }
        }
        if (memo.poiId) {
          if (memo.poiId === this.poi?.id) {
            exist = true;
          }
        }
        return exist;
      });
      this.showPaginator = true;
      this.editComponent = this.adminService.editMemoComponent;
    } else {
      this.memos = this.adminService.apiData['memo'];
    }
    this.ready = true;
    this.initData(this.memos);
    setTimeout(() => {
      this.loading = false;
    }, 0);
    this.updateParent();
  }

  newEntry() {
    super.newEntry();
    this.updateParent();
  }

  addNew() {
    if (this.overviewEditComponent) {
      this.overviewEditComponent.addNew(this.task?.id, this.poi?.id);

    } else if (this.editComponent) {
      this.editComponent.addNew(this.task?.id, this.poi?.id);
    }
    this.updateParent();

  }

  updateParent() {

    if (this.overviewEditComponent) {
      if (this.poi?.id && this.overviewEditComponent.entry) {
        this.overviewEditComponent.entry.poiId = this.poi.id;
      }
      if (this.task?.id && this.overviewEditComponent.entry) {
        if (!this.overviewEditComponent.entry.taskIds) {
          this.overviewEditComponent.entry.taskIds = [];
        }
        if (!this.overviewEditComponent.entry.taskIds.find((id: number) => id === this.task?.id)) {
          this.overviewEditComponent.entry.taskIds.push(this.task.id);
        }
      }
    }
    if (this.editComponent) {
      if (this.poi?.id && this.editComponent.entry) {
        this.editComponent.entry.poiId = this.poi.id;
      }
      if (this.task?.id && this.editComponent.entry) {
        if (!this.editComponent.entry.taskIds) {
          this.editComponent.entry.taskIds = [];
        }
        if (!this.editComponent.entry.taskIds.find((id: number) => id === this.task?.id)) {
          this.editComponent.entry.taskIds.push(this.task.id);
        }
      }
    }
    if (this.editEntry) {
      if (this.poi?.id && this.editEntry.poiId !== this.poi.id) {
        this.editEntry.poiId = this.poi.id;
        this.updateParentData();
      }
      if (this.task?.id) {
        if (!this.editEntry.taskIds) {
          this.editEntry.taskIds = [];
        }
        if (!this.editEntry.taskIds.find((id: number) => id === this.task?.id)) {
          this.editEntry.taskIds.push(this.task.id);
        }
        this.updateParentData();
      }
    }

  }

  updateParentData() {
    if (this.task && !this.task.dataIsLoading) {
      this.task.dataIsLoading = true;
      setTimeout(() => {
        if (this.task) {
          this.task.dataIsLoading = false;
        }
      }, 0);
    }
    if (this.poi && !this.poi.dataIsLoading) {
      this.poi.dataIsLoading = true;
      setTimeout(() => {
        if (this.poi) {
          this.poi.dataIsLoading = false;
        }
      }, 0);
    }
  }

  setEditEntry(poi: any) {
    if (this.editable) {
      this.editEntry = poi;
      if (this.editComponent) {
        this.editComponent.editEntry(poi);
      }
    }
    this.updateParent();
  }

  deleteEntry(entry: NgMemoEntity) {
    if (entry) {
      this.adminService.deleteEntry(entry, () => {
        this.getMemos();
        this.onDelete.emit();
        if (this.editEntry) {
          if (this.poi?.id && this.editEntry.poiId !== this.poi.id) {
            this.editEntry.poiId = 0;
            this.editEntry.update();
          }
          if (this.task?.id) {
            if (this.editEntry.taskIds?.length) {
              for (let i = 0; i < this.editEntry.taskIds.length; i++) {
                if (this.editEntry.taskIds[i] === entry.id) {
                  this.editEntry.taskIds.splice(i, 1);
                  this.editEntry.update();
                }
              }
            }
          }
        }
        this.updateParentData();
      });
    }
  }

}
