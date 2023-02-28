import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgTeamEntity} from "../../../../../../../../../angular-classes/angular-entities/ng.team.entity";
import {NgCompanyEntity} from "../../../../../../../../../angular-classes/angular-entities/ng.company.entity";
import {BackendAdminService} from "../../../../../backend-admin.service";

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements AfterViewInit, OnChanges {



  tabIndex = 0;
  loading = false;

  @Input() entry?: NgTeamEntity;
  @Input() company?: NgCompanyEntity;

  minTeamNameLength = 3;
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
    this.entry = new NgTeamEntity(this.adminService);
    this.tabIndex = 0;
  }

  editEntry(entry = this.entry) {
    this.entry = entry;
  }

  saveEntry() {
    if (this.valid() && this.entry) {
      if (!this.entry.id) {
        this.entry.add((result: any) => {

          this.adminService.sortData(this.adminService.apiData.team, 'teamname', false);
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

  activateTeam() {
    if (this.entry) {
      this.entry.active = true;
      this.entry.update();
    }
  }

  deactivateTeam() {
    if (this.entry) {
      this.entry.active = false;
      this.entry.update();
    }
  }

  deleteEntry(entry: NgTeamEntity) {

    this.adminService.deleteEntry(entry);
  }
}
