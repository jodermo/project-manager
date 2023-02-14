import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgApiEntity} from "../../../../../../../angular-classes/ng.api.entity";
import {BackendAdminService} from "../../../backend-admin.service";
import {NgAttributeEntity} from "../../../../../../../angular-classes/angular-entities/ng.attribute.entity";

@Component({
  selector: 'app-database-attribute',
  templateUrl: './database-attribute.component.html',
  styleUrls: ['./database-attribute.component.scss']
})
export class DatabaseAttributeComponent implements AfterViewInit, OnChanges {

  @Input() entry?: NgApiEntity | any;
  @Input() attribute?: NgAttributeEntity;
  @Input() attributeId?: number;
  @Input() editable = true;
  @Output() onEntrySaved = new EventEmitter<NgApiEntity | any>();
  @Output() onDelete = new EventEmitter();
  ready = false;

  constructor(public adminService: BackendAdminService) {
  }

  ngAfterViewInit() {
    this.getAttribute();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getAttribute();
  }

  getAttribute() {
    if (this.attribute) {
      this.attributeId = this.attribute.id;
    } else if (this.attributeId) {
      this.attribute = this.adminService.apiData['attribute']((attribute: NgAttributeEntity) => attribute.id === this.attributeId);
      if (!this.attribute) {
        this.adminService.get('attribute/' + this.attributeId, (result: any) => {
          if (result?.id) {
            this.attribute = new NgAttributeEntity(this.adminService).setData(result);
            if (!this.adminService.apiData['attribute'].find((attribute: NgAttributeEntity) => attribute.id === this.attribute?.id)) {
              this.adminService.apiData['attribute'].push(this.attribute);
            }
            this.getAttribute();
          }
        })
      }
    }
    if (this.attribute) {
      this.ready = true;
    }
  }

  deleteAttribute() {
    if (this.attribute) {
      this.adminService.deleteEntry(this.attribute, () => {
        this.attribute = undefined;
        this.attributeId = undefined;
        this.ready = false;
        this.onDelete.emit();
      });
    }
  }

  iconVisible() {
    return this.attribute?.icon !== undefined;
  }



  keyVisible() {
    return this.attribute?.key !== undefined;
  }



  valueVisible(){
    return this.attribute?.value !== undefined;
  }





}
