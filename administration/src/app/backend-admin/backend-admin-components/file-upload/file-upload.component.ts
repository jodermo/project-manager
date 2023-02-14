import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendAdminService } from '../../backend-admin.service';
import { NgApiEntity } from '../../../../../../angular-classes/ng.api.entity';
import { NgFileEntity } from '../../../../../../angular-classes/angular-entities/ng.file.entity';

interface LoadingFile {
  file: File;
  progress: number;
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements AfterViewInit {
  @Input() file?: NgFileEntity;
  @Input() entry?: NgApiEntity;
  @Input() fieldKey: string = 'fileId';
  @Input() label?: string;
  @Input() dropzoneLabel: string = 'Click to upload or drop file here';
  @Input() accept: string = '*';
  @Input() maxFileSize?: number;
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() expandable = false;
  @Input() areaLabel?: string;
  @Input() fileType?: string;

  @Output() onSelect = new EventEmitter<File[]>();
  @Output() onRemove = new EventEmitter<File[]>();
  @Output() onChange = new EventEmitter<NgApiEntity>();

  files: File[] = [];
  filesLoading: LoadingFile[] = [];
  databaseFiles: NgFileEntity[] = [];
  loading = false;
  ready = false;
  showUpload = false;
  rootPath = 'https://api.heldenreise-koenigswinter.de/';
  fileNotFound = false;
  selectExistingFile = false;

  constructor(public adminService: BackendAdminService) {

  }

  fileValue() {
    if (this.entry && this.fieldKey && (this.entry as any)[this.fieldKey] && (this.entry as any)[this.fieldKey] !== 0 && (this.entry as any)[this.fieldKey].length !== 0) {
      return (this.entry as any)[this.fieldKey];
    }
    return undefined;
  }

  ngAfterViewInit() {
    this.initEntity();
  }

  initEntity() {
    this.ready = false;
    this.databaseFiles = [];
    if (this.entry && this.fieldKey) {
      const value = (this.entry as any)[this.fieldKey];
      if (value) {
        if (this.multiple) {
          this.showUpload = true;
          for (const id of value) {
            const file = this.adminService.apiData['file'].find((file: NgFileEntity) => file.id === id);
            if (file) {
              this.databaseFiles.push(file);
            }
          }
        } else {
          const file = this.adminService.apiData['file'].find((file: NgFileEntity) => file.id === value);
          if (file) {
            this.showUpload = false;
            this.databaseFiles.push(file);
          }
        }
      } else {
        this.showUpload = true;
      }
      if (!this.databaseFiles.length) {
        this.fileNotFound = true;
      } else {
        this.fileNotFound = false;
      }
    }
    setTimeout(() => {
      this.ready = true;
    }, 0);
  }

  clearFile() {
    if (this.entry) {
      if (this.multiple) {
        this.setEntryValue(this.fieldKey, []);
      } else {
        this.setEntryValue(this.fieldKey, 0);
      }
      this.fileNotFound = false;
    }
  }

  private setEntryValue(attribute: string, value: any, entry: any = this.entry) {
    if (this.entry) {
      for (const key in this.entry) {
        if (key === attribute) {
          entry[key] = value;
          entry.setData(entry);
          entry.update(() => {
            this.onChange.emit(entry);
            this.initEntity();
          });
        }
      }
    }
  }

  newFile(): NgApiEntity {
    return new NgFileEntity(this.adminService);
  }

  setFileData(file: NgApiEntity, data: any) {
    file.setData(data);
  }

  select(event: any) {
    this.files.push(...event.addedFiles);
    this.onSelect.emit(this.files);
  }

  remove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.onRemove.emit(this.files);
  }


  saveFile() {
    let saved = 0;
    let databaseFiles: NgApiEntity[] = [];
    const save = (file: File, onDone: () => void) => {
      const done = () => {
        saved++;
        if (saved === this.files.length || !this.files.length) {
          this.files = [];
          if (!this.multiple) {
            this.showUpload = false;
          }
          onDone();
        }
      };
      const loadingFile = <LoadingFile>{file: file, progress: 0};
      this.filesLoading.push(loadingFile);
      this.adminService.uploadFile(file, (progress: number) => {
        loadingFile.progress = progress;
        if (progress >= 100) {
          this.removeQueryFile(file);
          this.removeLoadingFile(loadingFile);
        }
      }, (resultFile: any) => {
        resultFile = new NgFileEntity(this.adminService).setData(resultFile);
        this.databaseFiles.push(resultFile);
        this.adminService.apiData['file'].push(resultFile);
        databaseFiles.push(resultFile);
        if (this.entry && this.fieldKey && resultFile.id) {
          if (this.multiple) {
            if (!(this.entry as any)[this.fieldKey]) {
              (this.entry as any)[this.fieldKey] = [];
            }
            if ((this.entry as any)[this.fieldKey].find && !(this.entry as any)[this.fieldKey].find((existingId: any) => resultFile.id == existingId)) {
              (this.entry as any)[this.fieldKey].push(resultFile.id);
            }
          } else {
            (this.entry as any)[this.fieldKey] = resultFile.id;
          }
          this.entry.update(() => {
            done()
          }, () => {
            done()
          })
        } else {
          done()
        }
        this.setEntryFile(databaseFiles);
      }, () => {
        done();
      });
    };
    if (this.files.length) {
      this.loading = true;
      for (const file of this.files) {
        save(file, () => {
          if (saved === this.files.length) {
            this.setEntryFile(databaseFiles);
            this.initEntity();
          }
        });
      }
    }
  }

  setEntryFile(databaseFiles: NgApiEntity[]) {
    const ids = [];
    for (const databaseFile of databaseFiles) {
      if (databaseFile.id) {
        ids.push(databaseFile.id);
      }
    }
    if (this.entry && this.fieldKey) {
      if (this.multiple) {
        this.setEntryValue(this.fieldKey, ids.length ? ids : []);
      } else {
        this.setEntryValue(this.fieldKey, ids.length ? ids[0] : 0);
      }
    }
  }

  saveFileEntry(onDone?: () => void) {
    if (this.entry) {
      this.loading = true;
      if (this.entry.id) {
        this.entry.add(() => {
          this.loading = false;
          if (onDone) {
            onDone();
          }
        }, () => {
          this.loading = false;
          if (onDone) {
            onDone();
          }
        });
      } else {
        this.entry.update(() => {
          this.loading = false;
          if (onDone) {
            onDone();
          }
        }, () => {
          this.loading = false;
          if (onDone) {
            onDone();
          }
        });
      }
      this.initEntity();
    }
  }

  removeFile(file: NgFileEntity) {
    for (let i = 0; i < this.databaseFiles.length; i++) {
      if (this.databaseFiles[i].id === file.id) {
        this.databaseFiles.splice(i, 1);
        return;
      }
    }
  }

  deleteFile(file?: NgFileEntity) {
    if (file) {
      if (confirm('Bist du dir sicher?')) {
        this.removeFile(file);
        this.setEntryFile(this.databaseFiles);
        this.showUpload = true;
      }
    }
  }

  deleteFileId(fileId: number) {
    const file = this.adminService.apiData['file'].find((file: NgFileEntity)  => file.id === fileId);
    if (this.entry && file) {
      this.deleteFile(file);
    } else if (this.multiple && this.entry && this.fieldKey) {
      this.setEntryValue(this.fieldKey, []);
      this.showUpload = true;
    } else if (!this.multiple && this.entry && this.fieldKey) {
      this.setEntryValue(this.fieldKey, 0);
      this.showUpload = true;
    }
  }

  private removeQueryFile(file: File) {
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i] === file) {
        this.files.splice(i, 1);
        return;
      }
    }
  }

  private removeLoadingFile(loadingFile: LoadingFile) {
    for (let i = 0; i < this.filesLoading.length; i++) {
      if (this.filesLoading[i] === loadingFile) {
        this.filesLoading.splice(i, 1);
        return;
      }
    }
  }

  onChangeFiles(files?: NgFileEntity[]) {
    if(files && files.length){
      this.setEntryFile(files);
    }
  }

}
