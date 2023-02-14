import { Component, Input, OnInit } from '@angular/core';
import { BackendAdminService } from '../../../backend-admin.service';
import { NgFileEntity } from '../../../../../../../angular-classes/angular-entities/ng.file.entity';

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.scss']
})
export class PreviewFileComponent implements OnInit {
  @Input() file?: NgFileEntity;
  @Input() showMedia = true;
  @Input() download = true;
  @Input() preview = false;
  fileType = 'document';
  ready = false;
  showPreview = false;

  constructor(public adminService: BackendAdminService) {

  }

  ngOnInit(): void {
    if (this.file?.originalname) {
      this.fileType = this.adminService.fileUtil.getTypeFromFilename(this.file.originalname);
    }
    this.ready = true;
  }

}
