import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { BackendAdminService } from '../../../../../backend-admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgUserEntity } from '../../../../../../../../../angular-classes/angular-entities/ng.user.entity';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements AfterViewInit, OnChanges {


  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  @Input() editable = true;
  @Input() edit = false;
  @Input() apiRoute?: string;
  @Input() displayedColumns?: string[];

  @Input() pageSizeOptions = [50, 100, 150, 200, 250, 300];

  dataSource?: MatTableDataSource<NgUserEntity>;
  ready = false;
  loading = false;
  editEntry: any;

  selectedUsers: NgUserEntity[] = [];

  paginationReady = false;
  sortReady = false;
  filterType?: string;
  private filterValue: string = '';

  constructor(public adminService: BackendAdminService) {
  }


  ngAfterViewInit() {
    this.loadDefaultColumns();
    this.initData();
    this.initPagination();
    setTimeout(() => {
      this.ready = true;
      this.initPagination();
      setTimeout(() => {
        this.initPagination();
      }, 250);
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initPagination();
  }

  initPagination() {
    if (this.dataSource) {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Benutzer pro Seite';
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          return this.adminService.paginatorRangeLabel(page, pageSize, length);
        };
        this.paginationReady = true;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
        this.sortReady = true;
      }
    }
  }

  searchUsers() {

  }

  isSelected(user: NgUserEntity) {
    return (this.selectedUsers.find(selectedUser => selectedUser === user) !== undefined);
  }

  select(user: NgUserEntity) {
    if (!this.isSelected(user)) {
      this.selectedUsers.push(user);
    }
  }


  unselect(user: NgUserEntity) {
    for (let i = 0; i < this.selectedUsers.length; i++) {
      if (this.selectedUsers[i] === user) {
        this.selectedUsers.splice(i, 1);
        return;
      }
    }
  }

  toggleSelect(user: NgUserEntity) {
    if (!this.isSelected(user)) {
      return this.select(user);
    } else {
      return this.unselect(user);
    }
  }

  selectAll() {
    this.selectedUsers = this.adminService.apiData.user;
  }

  unselectAll() {
    this.selectedUsers = [];
  }

  loadAllEntries() {
    this.initData();
  }

  initData() {
    this.dataSource = new MatTableDataSource(this.adminService.apiData.user);
    this.initPagination();
  }

  filterData(attr: string, value: any) {
    const filteredData = this.adminService.apiData.user.filter((user: NgUserEntity) => {
      if (value === false) {
        return !(user as any)[attr] || (user as any)[attr] === value;
      } else {
        return (user as any)[attr] ? (user as any)[attr] === value : false;
      }

    });
    this.dataSource = new MatTableDataSource(filteredData);
    this.applyFilter({target: {value: this.filterValue}} as any);
  }

  parseResult(result: any[]) {
    const parsedData: any[] = [];
    if (result && result.length) {
      for (const entry of result) {
        parsedData.push(new NgUserEntity(this.adminService).setData(entry));
      }
    }
    return parsedData;
  }

  showError(error: any) {
    console.log('showError', error);
  }


  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    this.initPagination();
  }

  private loadDefaultColumns() {
    this.displayedColumns = [
      'ID',
      'Benutzername',
      'Email',
      'Firma',
      'Typ',
      'Aktion'
    ];

  }

  saveEntry() {
    if (this.editEntry) {
      this.loading = true;
      if (!this.editEntry.id) {
        this.editEntry.add(() => {
          this.loadAllEntries();
          this.editEntry = undefined;
        }, () => {
          this.loading = false;
        });
      } else {
        this.editEntry.update(() => {
          this.loading = false;
        }, () => {
          this.loading = false;
        });
      }
    }
  }

  allSelected() {
    return this.selectedUsers.length === this.adminService.apiData.user.length;
  }

  toggleSelectAll() {
    if (!this.allSelected()) {
      this.selectAll();
    } else {
      this.unselectAll();
    }
  }

  previewUser(user: NgUserEntity) {
    if (this.adminService.sharingRoute && user.id) {
      const sharingUrl = this.adminService.sharingRoute + user.id;
      window.open(sharingUrl, '_blank');
    } else {
      this.adminService.previewUser = user;
    }
  }

  showAll() {
    this.filterType = undefined;
    this.initData();
  }

  showActiveUsers() {
    this.filterType = 'active';
    this.filterData('active', true);
  }

  showInactiveUsers() {
    this.filterType = 'inactive';
    this.filterData('active', false);
  }

  showCanceledUsers() {
    this.filterType = 'canceled';
    this.filterData('canceled', true);
  }

  showCensoredUsers() {
    this.filterType = 'censored';
    this.filterData('censored', true);
  }

  activateUser(user: NgUserEntity) {
    user.active = true;
    user.update();

  }

  deleteEntry(user: any) {
    this.adminService.deleteEntry(user, () => {
      this.loading = true;
    }, () => {
      this.loading = false;
    }, this.dataSource, this.paginator);
  }
}
