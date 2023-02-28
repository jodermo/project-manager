import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {NgTeamEntity} from "../../../../../../../../../angular-classes/angular-entities/ng.team.entity";
import {BackendAdminService} from "../../../../../backend-admin.service";

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.scss']
})
export class TeamsTableComponent  implements AfterViewInit, OnChanges {


  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  @Input() editable = true;
  @Input() edit = false;
  @Input() apiRoute?: string;
  @Input() displayedColumns?: string[];

  @Input() pageSizeOptions = [50, 100, 150, 200, 250, 300];

  dataSource?: MatTableDataSource<NgTeamEntity>;
  ready = false;
  loading = false;
  editEntry: any;

  selectedTeams: NgTeamEntity[] = [];

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

  searchTeams() {

  }

  isSelected(team: NgTeamEntity) {
    return (this.selectedTeams.find(selectedTeam => selectedTeam === team) !== undefined);
  }

  select(team: NgTeamEntity) {
    if (!this.isSelected(team)) {
      this.selectedTeams.push(team);
    }
  }


  unselect(team: NgTeamEntity) {
    for (let i = 0; i < this.selectedTeams.length; i++) {
      if (this.selectedTeams[i] === team) {
        this.selectedTeams.splice(i, 1);
        return;
      }
    }
  }

  toggleSelect(team: NgTeamEntity) {
    if (!this.isSelected(team)) {
      return this.select(team);
    } else {
      return this.unselect(team);
    }
  }

  selectAll() {
    this.selectedTeams = this.adminService.apiData.team;
  }

  unselectAll() {
    this.selectedTeams = [];
  }

  loadAllEntries() {
    this.initData();
  }

  initData() {
    this.dataSource = new MatTableDataSource(this.adminService.apiData.team);
    this.initPagination();
  }

  filterData(attr: string, value: any) {
    const filteredData = this.adminService.apiData.team.filter((team: NgTeamEntity) => {
      if (value === false) {
        return !(team as any)[attr] || (team as any)[attr] === value;
      } else {
        return (team as any)[attr] ? (team as any)[attr] === value : false;
      }

    });
    this.dataSource = new MatTableDataSource(filteredData);
    this.applyFilter({target: {value: this.filterValue}} as any);
  }

  parseResult(result: any[]) {
    const parsedData: any[] = [];
    if (result && result.length) {
      for (const entry of result) {
        parsedData.push(new NgTeamEntity(this.adminService).setData(entry));
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
    return this.selectedTeams.length === this.adminService.apiData.team.length;
  }

  toggleSelectAll() {
    if (!this.allSelected()) {
      this.selectAll();
    } else {
      this.unselectAll();
    }
  }


  showAll() {
    this.filterType = undefined;
    this.initData();
  }

  showActiveTeams() {
    this.filterType = 'active';
    this.filterData('active', true);
  }

  showInactiveTeams() {
    this.filterType = 'inactive';
    this.filterData('active', false);
  }

  showCanceledTeams() {
    this.filterType = 'canceled';
    this.filterData('canceled', true);
  }

  showCensoredTeams() {
    this.filterType = 'censored';
    this.filterData('censored', true);
  }

  activateTeam(team: NgTeamEntity) {
    team.active = true;
    team.update();

  }

  deleteEntry(team: any) {
    this.adminService.deleteEntry(team, () => {
      this.loading = true;
    }, () => {
      this.loading = false;
    }, this.dataSource, this.paginator);
  }
}
