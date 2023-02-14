import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BackendAdminService } from '../../../../backend-admin.service';

export type DatabaseTableFieldType = 'text' | 'number' | 'parentId';

@Component({
  selector: 'app-database-table-field',
  templateUrl: './database-table-field.component.html',
  styleUrls: ['./database-table-field.component.scss']
})
export class DatabaseTableFieldComponent implements OnInit, OnChanges {

  @Input() entry?: any;
  @Input() column?: string;
  @Input() parentColumn?: string = 'parentId';
  @Input() apiRoute?: string;

  @Input() editable = false;
  @Input() edit = false;
  @Input() options = false;

  @Output() onChange = new EventEmitter<any>();
  @Output() onSaved = new EventEmitter<any>();
  @Output() onError = new EventEmitter<any>();

  loading = false;
  ready = false;

  type: DatabaseTableFieldType = 'text';
  oldValue = '';
  value = '';

  constructor(public adminService: BackendAdminService) {

  }

  ngOnInit(): void {
    if (this.entry && this.column) {
      this.oldValue = this.entry[this.column];
    }
    this.update();
    this.ready = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.entry && this.column) {
      this.oldValue = this.entry[this.column];
    }
    this.update();
  }

  update() {
    this.value = this.getValue();
  }

  getValue() {
    if (this.entry && this.column) {
      if (this.entry[this.column] || this.entry[this.column] === 0) {
        if (this.entry[this.column] === true) {
          return 'true';
        }
        return this.entry[this.column];
      }
      if (this.entry[this.column] === false) {
        return 'false';
      }
    }
    return '';
  }

  setValue(value = this.value) {
    this.value = value;
    if (this.entry && this.column) {
      if (value !== this.entry[this.column]) {
        this.entry[this.column] = value;
        this.onChange.emit(this.entry);
        this.update();
      }
    }
  }

  save() {
    this.oldValue = this.value;
    if (this.entry && this.entry.api) {
      this.loading = true;
      this.entry.update(() => {
        this.loading = false;
        this.onSaved.emit(this.entry);
      }, (error: any) => {
        this.loading = false;
        this.onError.emit(error);
      });
      this.edit = false;
    }
  }

  cancel() {
    this.value = this.oldValue;
    if (this.entry && this.column) {
      this.entry[this.column] = this.value;
    }
    this.edit = false;
  }
}
