import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendAdminService } from '../../backend-admin.service';
import { NgFileEntity } from '../../../../../../angular-classes/angular-entities/ng.file.entity';

@Component({
  selector: 'app-file-selection',
  templateUrl: './file-selection.component.html',
  styleUrls: ['./file-selection.component.scss']
})
export class FileSelectionComponent implements OnInit {


  @Input() file?: NgFileEntity;
  @Input() fileId?: number;
  @Input() fileIds?: number[];
  @Input() files: NgFileEntity[] = [];
  @Input() multiple = false;
  @Input() fileType?: string;

  filterQuery?: string;
  filteredFiles: NgFileEntity[] = [];

  @Output() onChangeIDs = new EventEmitter<number | number[] | undefined>();
  @Output() onChangeFiles = new EventEmitter<NgFileEntity[] | undefined>();

  constructor(public adminService: BackendAdminService) {

  }

  ngOnInit(): void {
    this.initSelectedFiles();
    this.updateFilter();
  }

  initSelectedFiles() {
    if (!this.files.length && this.file) {
      this.files = [this.file];
    } else if (!this.fileIds && this.fileId) {
      this.fileIds = [this.fileId];
    }
    if (!this.files.length && this.fileIds) {
      for (const fileId of this.fileIds) {
        const file = this.adminService.apiData['file'].find((file: NgFileEntity)  => file.id === fileId);
        if (file) {
          this.files.push(file);
        }
      }
    }
  }

  updateFilter() {
    this.filteredFiles = [];
    let newFilteredFiles = [];
    if (this.filterQuery) {
      newFilteredFiles = this.adminService.apiData['file'].filter((file: NgFileEntity) => this.filterQuery ? file.name.toLowerCase().includes(this.filterQuery.toLowerCase()) : false);
    } else {
      newFilteredFiles = this.adminService.apiData['file'];
    }
    if (this.fileType) {
      newFilteredFiles = this.adminService.apiData['file'].filter((file: NgFileEntity) => this.adminService.fileUtil.getTypeFromFilename(file.originalname) === this.fileType);
    }
    this.filteredFiles = newFilteredFiles;
  }

  addFile(file: NgFileEntity) {
    if (!this.fileSelected(file)) {
      this.files.push(file);
      this.change();
    }
  }

  removeFile(file: NgFileEntity) {
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i] === file) {
        this.files.splice(i, 1);
        this.change();
        return;
      }
    }
  }

  toggleFile(file: NgFileEntity) {
    if (!this.fileSelected(file)) {
      this.addFile(file)
    } else {
      this.removeFile(file)
    }

  }

  fileSelected(file: NgFileEntity) {
    return this.files.find(selectedFile => file === selectedFile) !== undefined;
  }

  change() {
    if (this.multiple) {
      this.fileIds = [];
      for (const file of this.files) {
        if (file.id) {
          this.fileIds.push(file.id);
        }
      }
      this.onChangeFiles.emit(this.files);
      this.onChangeIDs.emit(this.fileIds);
    } else {
      this.fileId = this.files.length ? this.files[0].id : undefined;
      this.onChangeFiles.emit(this.files.length ? [this.files[0]] : undefined);
      this.onChangeIDs.emit(this.fileId);
    }

  }

}
