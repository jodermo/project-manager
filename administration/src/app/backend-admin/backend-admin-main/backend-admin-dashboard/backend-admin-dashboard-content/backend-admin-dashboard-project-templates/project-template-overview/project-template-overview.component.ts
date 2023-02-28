import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { ProjectTemplateDatabaseTableComponent } from '../project-template-database-table/project-template-database-table.component';
import { EditProjectTemplateComponent } from '../edit-project-template/edit-project-template.component';
import { DatabaseOverviewComponent } from '../../../../../backend-admin-components/database/database-overview/database-overview.component';
import { NgProjectTemplateEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.project-template.entity';
import { DatabaseEditEntryComponent } from '../../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import { DatabaseTableComponent } from '../../../../../backend-admin-components/database/database-table/database-table.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-project-template-overview',
  templateUrl: './project-template-overview.component.html',
  styleUrls: ['./project-template-overview.component.scss']
})
export class ProjectTemplateOverviewComponent extends ProjectTemplateDatabaseTableComponent {
  @ViewChild(MatPaginator) overviewPaginator?: MatPaginator;
  @ViewChild(MatSort) overviewSort?: MatSort;
  @ViewChild('overviewEditComponent', {static: false}) overviewEditComponent?: DatabaseEditEntryComponent;
  @Input() entries?: NgProjectTemplateEntity[];
  renderData: NgProjectTemplateEntity[] = [];
  showPaginator = false;
  apiRoute = 'project-template';
  showLocation = false;
  @Input() projectTemplate?: NgProjectTemplateEntity;
  @Output() onSave = new EventEmitter<NgProjectTemplateEntity>();
  @Output() onDelete = new EventEmitter();
  showArModel = false;


  ngAfterViewInit() {
    this.getCustomData();
    this.initOverview();

  }

  ngOnChanges(changes: SimpleChanges) {

    super.ngOnChanges(changes);
    this.getCustomData();
  }

  initOverview() {
    this.showPaginator = (this.projectTemplate !== undefined || this.entry !== undefined);
    this.paginator = !this.paginator ? this.overviewPaginator : this.paginator;
    this.sort = !this.overviewSort ? this.overviewSort : this.sort;
    this.editComponent = !this.editComponent ? this.overviewEditComponent : this.editComponent;
  }

  getCustomData() {
    this.initOverview();

    if (this.projectTemplate?.id) {
      this.entries = this.adminService.apiData['projectTemplate'].filter((projectTemplate: NgProjectTemplateEntity) => projectTemplate.parentKey === this.projectTemplate?.id);
      this.editComponent = this.adminService.editProjectTemplateComponent;
    } else if (this.entry && this.fieldKey && (this.entry as any)[this.fieldKey]) {
      this.entries = this.adminService.apiData['projectTemplate'].filter((projectTemplate: NgProjectTemplateEntity) => this.fieldKey ? projectTemplate.parentKey === (this.entry as any)[this.fieldKey] : false);
      this.editComponent = this.adminService.editProjectTemplateComponent;
    } else {
      this.entries = this.adminService.apiData['projectTemplate'].filter((projectTemplate: NgProjectTemplateEntity) => !projectTemplate.parentKey);
    }
    this.initData(this.entries);
    this.ready = true;
    return true;
  }

  addNew() {
    if (this.editComponent) {
      this.editComponent.addNew();
      if (this.projectTemplate && this.editComponent.entry) {
        this.editComponent.entry.parentId = this.projectTemplate.id;
      }
    }
  }

  newEntry() {
    super.newEntry();
    if (this.projectTemplate && this.editEntry) {
      this.editEntry.parentId = this.projectTemplate.id;
    }
  }

  setEditEntry(projectTemplate: NgProjectTemplateEntity, subProjectTemplate = false) {
    if (this.editable) {
      this.editEntry = projectTemplate;
      if (this.projectTemplate && this.editEntry && !subProjectTemplate) {
        this.editEntry.parentId = this.projectTemplate.id;
      }
      if (this.editComponent) {
        this.editComponent.editEntry(projectTemplate);
      }
      console.log('setEditEntry', this.editEntry, this.editComponent);
    }
  }

  updateProjectTemplate() {
    if (this.projectTemplate && !this.projectTemplate.dataIsLoading) {
      this.projectTemplate.dataIsLoading = true;
      setTimeout(() => {
        if (this.projectTemplate) {
          this.projectTemplate.dataIsLoading = false;
        }
      }, 0);
    }
  }

  deleteEntry(entry: NgProjectTemplateEntity) {
    if (entry) {
      this.adminService.deleteEntry(entry, () => {
        this.getCustomData();
        this.updateProjectTemplate();
        this.onDelete.emit();
      });
    }
  }
}
