import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgProjectTemplateEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.project-template.entity';
import { DatabaseEditEntryComponent } from '../../../../../backend-admin-components/database/database-edit-entry/database-edit-entry.component';
import { NgCompanyEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.company.entity';
import { DatabaseTableFieldLocationEntryComponent } from '../../../../../backend-admin-components/database/database-table/database-table-field/database-table-field-location-entry/database-table-field-location-entry.component';

@Component({
  selector: 'app-edit-project-template',
  templateUrl: './edit-project-template.component.html',
  styleUrls: ['./edit-project-template.component.scss']
})
export class EditProjectTemplateComponent extends DatabaseEditEntryComponent implements OnChanges {

  @ViewChild('locationField', {static: false}) locationField?: DatabaseTableFieldLocationEntryComponent;
  @ViewChild('arModelLocationField', {static: false}) arModelLocationField?: DatabaseTableFieldLocationEntryComponent;

  @Input() parentFieldKey: string = 'project-templateIds';
  @Input() projectTemplate?: NgProjectTemplateEntity;
  minTitleLength = 1;

  @Output() onSave = new EventEmitter<NgProjectTemplateEntity>();
  @Output() onDelete = new EventEmitter();
  @Output() onUpdate = new EventEmitter<NgProjectTemplateEntity>();

  company?: NgCompanyEntity;

  ready = false;

  ngOnInit() {
    if (this.projectTemplate?.id && this.entry) {
      this.entry.parentId = this.projectTemplate.id;
    }
    this.updateParent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.entry?.parentId) {
      this.parentEntry = this.adminService.apiData['project-template'].find((projectTemplate: NgProjectTemplateEntity) => projectTemplate.id === this.entry.parentId);
    } else {
      this.parentEntry = undefined;
    }
    this.updateParent();
  }

  updateEntry() {
    if (this.entry && !this.entry.dataIsLoading) {
      this.entry.dataIsLoading = true;
      setTimeout(() => {
        if (this.entry) {
          this.entry.dataIsLoading = false;
        }
      }, 0);
    }
  }

  updateParent() {
    this.ready = false;
    if (this.entry && this.entry.id && this.parentEntry && !this.parentEntry.dataIsLoading) {
      this.parentEntry.dataIsLoading = true;
      setTimeout(() => {
        if (this.parentEntry) {
          this.parentEntry.dataIsLoading = false;
        }
      }, 0);
    }

    setTimeout(() => {
      this.ready = true;
    }, 0);
  }

  valid() {
    if (this.entry) {
      return this.entry.title && this.entry.title.length > this.minTitleLength;
      return super.valid();
    }
    return false;
  }

  addNew() {
    this.entry = new NgProjectTemplateEntity(this.adminService);
    if (this.projectTemplate?.id) {
      this.entry.parentId = this.projectTemplate.id;
    }
    this.tabIndex = 0;
  }


  saveEntry() {
    if (this.valid() && this.entry) {
      this.loading = true;
      if (this.projectTemplate?.id && this.entry) {
        this.entry.parentId = this.projectTemplate.id;
      }
      const done = () => {
        this.loading = false;
        this.onEntrySaved.emit(this.entry);
        this.onSave.emit(this.entry);
        this.updateParent();
      }
      if (!this.entry.id) {

        this.entry.add((result: any) => {
          if (this.entry) {
            this.entry.setData(result);
          } else {
            this.entry = new NgProjectTemplateEntity(this.adminService).setData(result);
          }
          if (this.parentEntry && this.parentFieldKey) {
            let parentEntries = (this.parentEntry as any)[this.parentFieldKey];
            if (!parentEntries) {
              parentEntries = [];
            }
            if (!parentEntries.find((entryId: number) => entryId === this.entry?.id)) {
              parentEntries.push(this.entry.id);
            }
            (this.parentEntry as any)[this.parentFieldKey] = parentEntries;
            this.parentEntry.update(() => {
              done();
            }, () => {
              done();
            });
          } else {
            done();
          }
        }, () => {
          this.loading = false;
        });
      } else {
        this.entry.update(() => {
          done();
        }, () => {
          done();
        });
      }
    }
  }

  getCompany() {
    if (this.entry) {
      if (this.entry.companyId) {
        this.company = this.adminService.apiData['company'].find((company: NgCompanyEntity) => company.id === this.entry.companyId);
      }
    }
  }

  newCompany() {
    this.company = new NgCompanyEntity(this.adminService);
  }

  saveCompany() {
    if (this.company && this.entry) {
      if (this.company.id) {
        this.entry.companyId = this.company.id;
        this.company.update(() => {
          this.entry.update();
        });
      } else {
        this.company.add((result: any) => {
          if (this.company) {
            this.company.setData(result);
            this.entry.companyId = this.company.id;
            this.entry.update();
          }
        });
      }
    }
  }

  update() {
    this.onUpdate.emit(this.entry);
  }

  toggleLocationMap() {
    if (this.locationField) {
      this.locationField.toggleMap();
    }
    if (this.arModelLocationField) {
      this.arModelLocationField.toggleMap();
    }
  }

  editLocationMap() {
    if (this.locationField && this.entry.type === 'location') {
      this.locationField.toggleEditLocation();
    }
    if (this.arModelLocationField && this.entry.type === 'ar-model') {
      this.arModelLocationField.toggleEditLocation();
    }
  }
}
