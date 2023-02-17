import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {BackendAdminService} from '../../backend-admin.service';
import {NgAddressEntity} from '../../../../../../angular-classes/angular-entities/ng.address.entity';
import {NgApiEntity} from '../../../../../../angular-classes/ng.api.entity';
import {NgCompanyEntity} from '../../../../../../angular-classes/angular-entities/ng.company.entity';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnChanges {

  @Input() addressId?: number;
  @Input() address?: NgAddressEntity;
  @Input() company?: NgCompanyEntity;
  @Input() addressType = 'default';
  @Input() editable = true;
  @Input() detailed = false;
  @Input() options = true;

  @Input() hideName = false;
  @Input() hideFields = [];

  @Input() edit = false;
  @Input() autoRenew = false;
  @Input() label?: string;
  @Input() entry?: NgApiEntity;
  @Input() fieldName = 'addressId';
  newAddress = false;

  @Input() multiple = false;

  @Output() onChange: EventEmitter<NgAddressEntity> = new EventEmitter();

  selectAddress = false;

  loading = false;
  ready = false;


  constructor(public adminService: BackendAdminService) {
  }

  ngOnInit(): void {
    this.loadAddress();
    this.ready = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadAddress();
  }


  loadAddress() {
    if (this.entry && this.fieldName) {
      this.addressId = (this.entry as any)[this.fieldName];
    }
    if (!this.autoRenew) {
      const address = this.getEntryAddress();
      if (address) {
        this.addressId = address.id;
        return;
      }
      if (this.address?.id && !this.addressId) {
        this.addressId = this.address.id;
      }
      if (this.addressId && (!this.address || (this.address.id && this.address.id !== this.addressId))) {
        this.address = this.adminService.getAddressById(this.addressId);
        this.update();
      }
    }
    if (!this.address) {
      this.addNewAddress();
    }
  }

  fieldIsHidden(fieldName: string) {
    return this.hideFields.find(hiddenField => hiddenField === fieldName) !== undefined;
  }

  save() {


    if (this.address) {
      this.loading = true;
      if (this.adminService.user?.id) {
        this.address.userId = this.adminService.user.id;
      }
      if (this.addressType) {
        this.address.addressType = this.addressType;
      }
      if (this.address?.id) {
        this.address.update(() => {
          this.updateEntry();
          this.edit = false;
          this.loading = false;
        }, () => {
          this.loading = false;
        });
      } else {
        this.address.add((result: any) => {
          this.updateEntry();
          this.edit = false;
          this.update();
          this.loading = false;
          if (this.autoRenew) {
            this.addNewAddress();
          }
        }, () => {
          this.loading = false;
        });
      }
    }
  }

  getEntryAddress() {
    if (this.entry && this.fieldName && (this.entry as any)[this.fieldName]) {
      if (this.multiple) {
        let addressIds: any[] = [];
        if (addressIds?.length) {
          this.address = this.adminService.apiData.address.find((address : NgAddressEntity) => addressIds.find(addressId => parseInt(addressId) === address.id) !== undefined);
        }
      } else {
        this.address = this.adminService.apiData.address.find((address : NgAddressEntity) => this.entry && address.id === (this.entry as any)[this.fieldName]);
      }
    }
    return this.address;
  }

  updateEntry() {

    if (this.address?.id && this.entry && this.fieldName) {


      this.entry.update();
    }


  }

  addNewAddress() {
    this.address = new NgAddressEntity(this.adminService);
    this.edit = true;
    this.newAddress = true;
    this.update();
  }


  saveNewAddress() {
    this.save();
    this.adminService.newAddress = this.address;
    if (this.adminService.newAddress) {
      this.loading = true;
      this.adminService.saveNewAddress((newAddress: NgAddressEntity) => {
        this.address = newAddress;
        this.edit = false;
        this.newAddress = false;
        this.update();
        this.loading = false;
        this.onChange.emit(this.address);
      }, () => {
        this.loading = false;
      });
    }
  }

  update() {
    this.onChange.emit(this.address);
  }

  deleteAddress() {
    if (this.address?.id) {
      this.adminService.deleteEntry(this.address, () => {

          if (this.entry && this.fieldName) {
            if (this.multiple) {
              let addressIds: number[] = [];
              for (let i = 0; i < addressIds.length; i++) {
                if (addressIds[i] === this.address?.id) {
                  addressIds.splice(i, 1);
                }
              }
              (this.entry as any)[this.fieldName] = addressIds;
            } else {
              (this.entry as any)[this.fieldName] = undefined;
            }
            this.entry.update();
          }
          this.address = undefined;
          this.addressId = undefined;

      });

    }
  }

  saveAddress(company?: NgCompanyEntity) {

    if (this.newAddress) {
      this.saveNewAddress();
    } else if (this.address) {
      this.address.update();
    }
  }

}
