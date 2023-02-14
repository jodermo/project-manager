import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { NgApiEntity } from '../../../../../../../../../angular-classes/ng.api.entity';
import { ClientDeviceService } from '../../../../../../client-device/client-device.service';
import { NgCompanyEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.company.entity';

@Component({
  selector: 'app-database-table-field-company-entry',
  templateUrl: './database-table-field-company-entry.component.html',
  styleUrls: ['./database-table-field-company-entry.component.scss']
})
export class DatabaseTableFieldCompanyEntryComponent implements OnInit {


  @Input() entry?: NgApiEntity;
  @Input() fieldKey: string = 'companyId';
  @Input() companyId?: number;
  @Input() company?: NgCompanyEntity;

  editCompany?: NgCompanyEntity;

  loading = false;
  ready = false;

  @Output() onChange = new EventEmitter<NgApiEntity>();


  constructor(public adminService: BackendAdminService, public deviceService: ClientDeviceService) {
  }

  ngOnInit(): void {
    this.initCompany();
    this.ready = true;
  }

  initCompany() {
    if (this.entry && this.fieldKey) {
      this.companyId = (this.entry as any)[this.fieldKey];
    }
    if (!this.company && this.companyId) {
      this.company = this.adminService.apiData['company'].find((company: NgCompanyEntity) => company.id === this.companyId);
    } else if (!this.company) {
      this.addNewCompany();
    }
  }

  addNewCompany() {
    this.editCompany = new NgCompanyEntity(this.adminService);
  }

  saveCompany() {
    this.loading = true;
    if (this.editCompany) {
      if (this.editCompany.id) {
        this.editCompany.update(() => {
          this.company = this.editCompany;
          this.companyId = this.company?.id;
          this.editCompany = undefined;
          if (this.entry && this.fieldKey) {
            (this.entry as any)[this.fieldKey] = this.companyId;
            this.entry.update(() => {
              this.onChange.emit(this.entry);
              this.initCompany();
              this.loading = false;
            });
          } else {
            this.onChange.emit(this.entry);
            this.initCompany();
            this.loading = false;
          }
        }, () => {
          this.loading = false;
        });
      } else {
        this.editCompany.add((result: any) => {
          if (result) {
            this.editCompany = new NgCompanyEntity(this.adminService).setData(result);
            this.company = this.editCompany;
            this.companyId = this.company.id;
            this.adminService.apiData['company'].push(this.editCompany);
            if (this.entry && this.fieldKey) {
              (this.entry as any)[this.fieldKey] = this.editCompany.id;
              this.entry.update(() => {
                this.editCompany = undefined;
                this.onChange.emit(this.entry);
                this.initCompany();
              });
            }
          }
          this.loading = false;
        }, () => {
          this.loading = false;
        });
      }
    }
  }

  companyChange() {
    this.saveCompany();
  }
}
