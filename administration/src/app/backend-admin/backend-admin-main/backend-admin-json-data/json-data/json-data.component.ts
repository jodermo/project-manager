import { AfterViewInit, Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BackendAdminService } from '../../../backend-admin.service';
import { JsonDataService } from '../json-data.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-json-data',
  templateUrl: './json-data.component.html',
  styleUrls: ['./json-data.component.scss']
})
export class JsonDataComponent implements AfterViewInit, OnChanges {

  @Input() parentId?: number;
  @Input() parentKey?: string;
  @Input() data?: any;

  public jsonData?: JsonDataService;
  expanded: any = {};

  constructor(public adminService: BackendAdminService, public dialog: MatDialog) {
  }

  toggle(id: number){
    if(!this.expanded[id]){
      this.expanded[id] = true;
    }else{
      this.expanded[id] = false;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.updateData();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogJsonDataDialog, {
      data: this.jsonData
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  updateData() {
    if (!this.jsonData) {
      this.jsonData = new JsonDataService();
      this.jsonData.parentId = this.parentId;
      this.jsonData.parentKey = this.parentKey;
    }
    if (!this.adminService.jsonData && !this.parentId) {
      this.adminService.jsonData = this.jsonData;
    }
    if (this.data && this.jsonData) {
      this.jsonData?.parseDataAttributes(this.data);
    }
  }

  selectJsonData() {
    this.adminService.jsonData = this.jsonData;
  }
}

@Component({
  selector: 'dialog-json-data-dialog',
  templateUrl: 'json-data-dialog.component.html',
})
export class DialogJsonDataDialog {

  constructor(public adminService: BackendAdminService, @Inject(MAT_DIALOG_DATA) public jsonData: JsonDataService) {

  }
}
