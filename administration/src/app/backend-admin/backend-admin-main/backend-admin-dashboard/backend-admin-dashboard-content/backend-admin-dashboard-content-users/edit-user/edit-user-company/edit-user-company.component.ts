import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { BackendAdminService } from '../../../../../../backend-admin.service';
import { NgUserEntity } from '../../../../../../../../../../angular-classes/angular-entities/ng.user.entity';
import { NgCompanyEntity } from '../../../../../../../../../../angular-classes/angular-entities/ng.company.entity';
import { AddressComponent } from '../../../../../../backend-admin-components/address/address.component';

@Component({
  selector: 'app-edit-user-company',
  templateUrl: './edit-user-company.component.html',
  styleUrls: ['./edit-user-company.component.scss']
})
export class EditUserCompanyComponent implements AfterViewInit, OnChanges {
  @ViewChild('editCompanyComponent', {static: false}) editCompanyComponent?: AddressComponent;

  @Input() user?: NgUserEntity;
  company?: NgCompanyEntity;

  ready = false;

  @Output() onChange = new EventEmitter<NgCompanyEntity>();
  newCompany = false;

  constructor(public adminService: BackendAdminService) {
  }

  ngAfterViewInit() {
    this.getCompany();
    setTimeout(() => {
      this.ready = true;
    }, 0);

  }

  ngOnChanges(changes: SimpleChanges) {
    this.getCompany();
  }

  getCompany() {

  }

  setCompany(company = this.company) {

  }

  createNewCompany() {
    this.company = new NgCompanyEntity(this.adminService);
    this.newCompany = true;
  }

  cancelCreateNewCompany() {
    this.company = undefined;
    this.newCompany = false;
  }

  save(){
    if(this.editCompanyComponent){
      this.editCompanyComponent.saveAddress();
    }
  }
}
