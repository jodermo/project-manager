import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgUserService} from '../../../../angular-classes/ng.user.service';
import {JsonDataService} from './backend-admin-main/backend-admin-json-data/json-data.service';
import {NgAppSettingsEntity} from '../../../../angular-classes/angular-entities/ng.app-settings.entity';
import {NgLanguageEntity} from '../../../../angular-classes/angular-entities/ng.language.entity';
import {ActivatedRoute, Router} from '@angular/router';
import {
  NgSubTaskTypes,
  NgTaskEntity,
  NgTaskTypes
} from '../../../../angular-classes/angular-entities/ng.task.entity';
import {NgLocationEntity} from '../../../../angular-classes/angular-entities/ng.location.entity';
import {NgUserEntity} from '../../../../angular-classes/angular-entities/ng.user.entity';
import {LocationsMapComponent} from './backend-admin-components/locations-map/locations-map.component';
import {MapLayer} from './classes/map-layer';
import {FormBuilder} from '@angular/forms';
import {NgFileEntity} from '../../../../angular-classes/angular-entities/ng.file.entity';
import {NgApiEntity} from '../../../../angular-classes/ng.api.entity';
import {NgCompanyEntity, NgCompanyTypes} from '../../../../angular-classes/angular-entities/ng.company.entity';
import {
  EditCompanyComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-companies/edit-company/edit-company.component';
import {
  EditFileComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-files/edit-file/edit-file.component';
import {
  EditLocationComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-locations/edit-location/edit-location.component';
import {
  EditTaskComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-tasks/edit-task/edit-task.component';
import {NgAttributeTypes} from "../../../../angular-classes/angular-entities/ng.attribute.entity";
import {NgAddressEntity} from "../../../../angular-classes/angular-entities/ng.address.entity";
import {BackendAdminPages} from "./backend-admin.pages";
import {NgProjectEntity} from "../../../../angular-classes/angular-entities/ng.project.entity";
import {
  DatabaseEditEntryComponent
} from "./backend-admin-components/database/database-edit-entry/database-edit-entry.component";
import {NgTeamEntity} from "../../../../angular-classes/angular-entities/ng.team.entity";

export class BackendAdminError {
  time = 0;

  constructor(service: BackendAdminService, public message = 'Something went wrong', public info?: string, public object?: any) {
    this.time = Date.now();
    service.backendErrors.push(this);
  }
}


@Injectable({
  providedIn: 'root'
})
export class BackendAdminService extends NgUserService {
  title = 'Project Manager - Administration';
  frontendUrl = 'https://project-manager.witali-ruff.de';
  sharingRoute = this.frontendUrl + '/share/';
  editUser?: NgUserEntity;
  previewUser?: NgUserEntity;
  paginatorRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length > pageSize) {
      const startValue = (page * pageSize) + 1;
      let endValue = startValue + pageSize - 1;
      if (endValue > length) {
        endValue = length;
      }
      return startValue + ' - ' + endValue + ' von ' + length;
    } else if (length) {
      return '1 - ' + length + '';
    } else {
      return 'Keine Einträge';
    }
  };
  menuOptions = [
    {
      title: 'Logout',
      icon: 'logout',
      event: () => {
        this.logout();
      }
    },
    {
      icon: 'settings',
      event: () => {
        this.toggleConfig();
      }
    }
  ];
  dashboard = {
    pages: BackendAdminPages(this) as any,
    page: (undefined as any),
    showMenu: false,

    showPage: (page: any) => {
      this.showPage(page);
    },
    showPageByName: (name: string) => {
      const page = this.dashboard.pages.find((page: any) => page.name === name);
      if (page) {
        this.showPage(page);
      }
    },
    selectPageOption(pageOption: any, index = 0) {
      if (this.page) {
        this.page.optionIndex = index;
      }
      this.showMenu = false;
    }
  };
  newAddress?: NgAddressEntity;
  newConfiguration?: NgAppSettingsEntity;
  newLanguage?: NgLanguageEntity;
  jsonData?: JsonDataService;
  currentBackendError?: BackendAdminError;
  backendErrors: BackendAdminError[] = [];
  private mapComponent?: LocationsMapComponent;
  mapLayers: MapLayer[] = [];
  taskTypes = NgTaskTypes;
  subTaskTypes = NgSubTaskTypes;
  companyTypes = NgCompanyTypes;
  configVisible = false;
  editCompanyComponent?: EditCompanyComponent;
  editFileComponent?: EditFileComponent;
  editLocationComponent?: EditLocationComponent;
  editTaskComponent?: EditTaskComponent;

  apiData: any = {
    'task': [] as NgTaskEntity[],
    'company': [] as NgCompanyEntity[],
    'location': [] as NgLocationEntity[],
    'file': [] as NgFileEntity[],
    'user': [] as NgUserEntity[],
    'user-group': [] as NgTaskEntity[]
  };
  attributeTypes = NgAttributeTypes;
  companyAttributes: any = {
    'main-attribute': ['icon-text']
  }
  editTask?: NgTaskEntity;
  salutations = [
    {value: 'Mr.', label: 'Mr.'},
    {value: 'Mrs.', label: 'Mrs.'},
    {value: 'Diverse', label: 'Diverse'}
  ];
  projects: NgProjectEntity[] = [];
  projectTemplateTypes: any[] = [];
  editProjectTemplateComponent?: DatabaseEditEntryComponent;
  editTeam?: NgTeamEntity;

  constructor(
    httpClient: HttpClient,
    formBuilder: FormBuilder,
    router: Router,
    route: ActivatedRoute,
  ) {
    super(
      httpClient,
      formBuilder,
      new HttpHeaders()
        .set('content-type', 'application/json'),
      {},
      router,
      route,
    );
    this.initEnvironment('prod');
    if (this.dashboard.pages.length) {
      this.dashboard.showPage(this.dashboard.pages[0]);
    }
    setTimeout(() => {
      this.loadData();
      this.loadProjects();
    }, 0);
  }


  loadFiles(onDone ?: () => void) {
    this.load();
    this.get('file', (result: any) => {
      this.apiData['file'] = [];
      if (result && result.length) {
        for (const file of result) {
          this.apiData['file'].push(new NgFileEntity(this).setData(file));
        }
      }
      this.apiData['file'] = this.apiData['file'].sort((a: any, b: any) => {
        return (a.id || 0) - (b.id || 0);
      });
      this.loaded();
      if (onDone) {
        onDone();
      }
    }, () => {
      this.loaded();
      if (onDone) {
        onDone();
      }
    });
  }


  saveNewAddress(onSuccess?: (address: NgAddressEntity) => void, onError?: (error: any) => void) {
    if (this.newAddress) {
      this.load();
      this.newAddress.add((result: any) => {
        this.loaded();
        if (onSuccess) {
          onSuccess(result);
        }
      }, (error: any) => {
        this.loaded();
        if (onError) {
          onError(error);
        }
      });
    }
  }

  showPage(page: any) {
    setTimeout(() => {
      this.dashboard.page = undefined;
      setTimeout(() => {
        this.dashboard.page = page;
        this.dashboard.showMenu = false;
      }, 0);
    }, 0);

  }

  deleteFile(file: NgFileEntity, onSuccess?: () => void, onError?: (error: any) => void) {
    if (confirm('Bist du dir sicher?')) {
      file.delete(() => {
        this.loadFiles(() => {
          if (onSuccess) {
            onSuccess();
          }
        });
      }, (error: any) => {
        if (onError) {
          onError(error);
        }
      });
    }
  }

  mainTasks(tasks = this.apiData.task) {
    return tasks?.filter((task: NgTaskEntity) => !task.nextTask);
  }

  subTasks(task: NgTaskEntity, tasks = this.apiData.task): NgTaskEntity[] {
    if (task.id) {
      return tasks.filter((subTask: NgTaskEntity) => subTask.nextTask === task.id);
    }
    return [];
  }


  backendError(message: string, info?: string, object?: any) {
    this.currentBackendError = new BackendAdminError(this, message, info, object);
  }

  initNewConfiguration() {
    if (!this.newConfiguration) {
      this.newConfiguration = new NgAppSettingsEntity(this);
    }
    if (!this.newLanguage) {
      this.newLanguage = new NgLanguageEntity(this);
    }
  }

  saveNewConfiguration() {
    if (this.newConfiguration) {
      this.load();
      this.newConfiguration.add((appSettings: any) => {
        if (appSettings) {
          this.setting = new NgAppSettingsEntity(this).setData(appSettings);
        }
        this.loaded();
      }, (error: any) => {
        this.loaded();
      });
    }
  }

  saveNewLanguage() {
    if (this.newLanguage && this.newLanguage.name.length >= 3 && this.newLanguage.iso.length >= 2) {
      this.load();
      this.newLanguage.add((language: any) => {
        if (language) {
          language = new NgLanguageEntity(this).setData(language);
          this.languages.push(language);
          if (this.newConfiguration) {
            this.newConfiguration.defaultLanguageId = language.id;
          }
        }
        this.loaded();
      }, (error: any) => {
        this.loaded();
      });
    } else {
      this.backendError('Nme or ISO wrong');
    }
  }

  showConfig() {
    this.configVisible = true;
  }

  hideConfig() {
    this.configVisible = false;
  }

  toggleConfig() {
    if (this.configVisible) {
      this.hideConfig();
    } else {
      this.showConfig();
    }
  }

  goToVideoUpload() {

  }

  setMapComponent(mapComponent = this.mapComponent) {
    this.mapComponent = mapComponent;
    this.updateMap();
  }

  private updateMap() {

  }

  getFileById(fileId: number) {
    return this.apiData['file'].find((file: NgFileEntity) => file.id === fileId);
  }


  private deleteS3File(file: NgFileEntity, onSuccess?: () => void, onError?: (error?: any) => void) {
    this.delete(file.path, undefined, () => {
      if (onSuccess) {
        onSuccess()
      }
    }, onError);
  }


  downloadFile(file: NgFileEntity) {
    const path = this.url() + file.path;
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    (link as any).download = file.name;
    (link as any).href = path;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  deleteEntry(entry: NgApiEntity, onSuccess?: () => void, onError?: (error: any) => void, dataSource?: any, paginator?: any) {

    if (confirm('Sind Sie sich sicher?')) {
      entry.delete((result: any) => {
        if (onSuccess) {
          onSuccess()
        }
      }, (error: any) => {
        if (onError) {
          onError(error);
        }
      });
    }
  }

  createNewUser() {
    this.editUser = new NgUserEntity(this);
  }


  randomGreeting() {
    const greetings = [
      'Moin',
      'Moin Moin',
      'Guten Tag',
      'Servus',
      'Hallöchen',
      'Hi',
      'Hey',
      'Willkommen'
    ]
    const i = Math.floor(Math.random() * greetings.length);
    return greetings[i];
  }

  entriesLengthByName(entriesName: any) {
    let length = 0;
    if (this.apiData[entriesName]) {
      length = this.apiData[entriesName].length;
    }
    return length;
  }

  locationDistance(location: NgLocationEntity, latitude: number, longitude: number) {
    let distance = 0;
    if (location.latitude && location.latitude) {
      distance = this.distance({
        latitude: location.latitude,
        longitude: location.longitude
      }, {
        latitude: latitude,
        longitude: longitude
      });
    }
    return distance.toFixed(2);
  }

  formFieldType(column: string) {
    const fields: any = {
      'location': {
        single: ['locationId'],
        multiple: ['locationIds'],
        name: {
          single: 'POI',
          multiple: 'POIs',
        }
      }
    };
    const result = {
      column: column,
      type: 'default',
      multiple: false,
      name: column,
    };
    for (const attr in fields) {
      if (fields[attr].multiple) {
        for (const fieldName of fields[attr].multiple) {
          if (fieldName === column) {
            result.type = attr;
            result.multiple = true;
            result.name = fields[attr].name?.multiple || attr;
            return result;
          }
        }
      }
      if (fields[attr].single) {
        for (const fieldName of fields[attr].single) {
          if (fieldName === column) {
            result.type = attr;
            result.multiple = false;
            result.name = fields[attr].name?.single || attr;
            return result;
          }
        }
      }
    }
    return result;
  }


  addNewTask(parentNode?: NgTaskEntity) {
    const newTask = new NgTaskEntity(this);
    if (parentNode?.id) {
      newTask.nextTask = parentNode.id;
    }
    this.editTask = newTask;
  }

  toggleEntry(entry: NgApiEntity, e?: any) {
    if (e?.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    entry.active != entry.active;
    entry.update();
  }


  getAddressById(addressId: number) {
    return undefined;
  }

  loadProjects(onDone?: () => void) {
    this.get('project', (results: any) => {
      this.projects = [];
      if (results?.length) {
        for (const result of results) {
          const project = new NgProjectEntity(this).setData(result);
          this.projects.push(project);
        }
        this.projects = this.sortData(this.projects, 'startDate');
      }
      if (onDone) {
        onDone();
      }
    }, () => {
      if (onDone) {
        onDone();
      }
    });
  }

  createNewTeam() {

  }
}
