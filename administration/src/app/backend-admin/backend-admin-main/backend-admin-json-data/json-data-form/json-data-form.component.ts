import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendAdminService } from '../../../backend-admin.service';

@Component({
  selector: 'app-json-data-form',
  templateUrl: './json-data-form.component.html',
  styleUrls: ['./json-data-form.component.scss']
})
export class JsonDataFormComponent {

  @Output() onOpenDialog = new EventEmitter<any>();
  @Input() parentId?: number;
  @Input() id?: number;

  constructor(public adminService: BackendAdminService) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.onOpenDialog.emit();
  }
}
