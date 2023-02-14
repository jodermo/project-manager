import { Component, Input, OnInit } from '@angular/core';
import { BackendAdminService } from '../../backend-admin.service';
import { NgFileEntity } from '../../../../../../angular-classes/angular-entities/ng.file.entity';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent implements OnInit {


  @Input() id?: number;
  @Input() ids?: number[];
  @Input() file?: NgFileEntity;
  @Input() files: NgFileEntity[] = [];
  @Input() showMedia = true;
  @Input() download = false;
  @Input() preview = false;

  ready = false;

  constructor(public adminService: BackendAdminService) {

  }

  ngOnInit(): void {
    this.initFiles();
  }

  initFiles() {
    if (!this.files.length) {
      if (this.ids?.length) {
        for (const id of this.ids) {
          const file = this.adminService.apiData['file'].find((file: NgFileEntity) => file.id === id);
          if (file) {
            this.files.push(file);
          }
        }
      } else if (this.file) {
        this.files.push(this.file);
      } else if (this.id) {
        this.file = this.adminService.apiData['file'].find((file: NgFileEntity) => file.id === this.id);
        if (this.file) {
          this.files.push(this.file);
        }
      }
    }
    this.ready = true;
  }

}
