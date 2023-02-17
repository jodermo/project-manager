import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgUserEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.user.entity';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { NgCompanyEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.company.entity';
import { EditUserCompanyComponent } from './edit-user-company/edit-user-company.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements AfterViewInit, OnChanges {
  @ViewChild('editUserCompanyComponent', {static: false}) editUserCompanyComponent?: EditUserCompanyComponent;
  @ViewChild('editMainCompanyComponent', {static: false}) editMainCompanyComponent?: EditUserCompanyComponent;


  tabIndex = 0;
  loading = false;

  @Input() entry?: NgUserEntity;
  @Input() company?: NgCompanyEntity;

  minUsernameLength = 3;
  minEmailLength = 3;

  newPassword?: string = '';
  newPasswordConfirm?: string = '';
  showHint = false;

  constructor(public adminService: BackendAdminService) {
  }

  ngAfterViewInit() {
    this.getCompany();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getCompany();
  }

  getCompany() {

  }

  valid() {
    this.getCompany();
    if (this.newPassword && this.newPassword !== this.newPasswordConfirm) {
      return false;
    }
    return true;
  }

  addNew() {
    this.entry = new NgUserEntity(this.adminService);
    this.tabIndex = 0;
  }

  editEntry(entry = this.entry) {
    this.entry = entry;
  }

  saveEntry() {
    if (this.editUserCompanyComponent) {
      this.editUserCompanyComponent.save();
    }
    if (this.editMainCompanyComponent) {
      this.editMainCompanyComponent.save();
    }
    if (this.entry && this.newPassword && this.newPassword === this.newPasswordConfirm) {
      this.entry.password = this.newPassword;
    }
    if (this.valid() && this.entry) {
      if (!this.entry.id) {
        this.entry.add((result: any) => {

          this.adminService.sortData(this.adminService.apiData.user, 'username', false);
          this.newPassword = undefined;
          this.newPasswordConfirm = undefined;
        });
      } else {
        this.entry.update(() => {
          this.newPassword = undefined;
          this.newPasswordConfirm = undefined;
        });
      }
    }

  }

  cancel() {
    this.entry = undefined;

  }

  activateUser() {
    if (this.entry) {
      this.entry.active = true;
      this.entry.update();
    }
  }

  deactivateUser() {
    if (this.entry) {
      this.entry.active = false;
      this.entry.update();
    }
  }

  deleteEntry(entry: NgUserEntity) {

    this.adminService.deleteEntry(entry);
  }
}
