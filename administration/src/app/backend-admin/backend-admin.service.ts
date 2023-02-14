import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgUserService} from '../../../../angular-classes/ng.user.service';
import {JsonDataService} from './backend-admin-main/backend-admin-json-data/json-data.service';
import {NgAppSettingsEntity} from '../../../../angular-classes/angular-entities/ng.app-settings.entity';
import {NgLanguageEntity} from '../../../../angular-classes/angular-entities/ng.language.entity';
import {ActivatedRoute, Router} from '@angular/router';
import {NgMemoEntity} from '../../../../angular-classes/angular-entities/ng.memo.entity';
import {
  NgMainTaskTypes, NgSubTaskTypes,
  NgTaskArModelTypes,
  NgTaskEntity,
  NgTaskTypes
} from '../../../../angular-classes/angular-entities/ng.task.entity';
import {NgPoiEntity} from '../../../../angular-classes/angular-entities/ng.poi.entity';
import {NgUserEntity} from '../../../../angular-classes/angular-entities/ng.user.entity';
import {PoiMapComponent} from './backend-admin-components/poi-map/poi-map.component';
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
  EditMemoComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-memos/edit-memo/edit-memo.component';
import {
  EditPoiComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-pois/edit-poi/edit-poi.component';
import {
  EditTaskComponent
} from './backend-admin-main/backend-admin-dashboard/backend-admin-dashboard-content/backend-admin-dashboard-tasks/edit-task/edit-task.component';
import {NgAttributeTypes} from "../../../../angular-classes/angular-entities/ng.attribute.entity";

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
    pages: [
      {
        name: 'Dashboard',
        icon: 'home',
        optionIndex: 0,
        menu: () => {
          return true;
        },
      },
      {
        name: 'Projects',
        icon: 'work',
        menu: () => {
          return true;
        },
        dashboard: () => {
          return true;
        },
      },
      {
        name: 'Tasks',
        icon: 'assignment_turned_in',
        menu: () => {
          return true;
        },
        dashboard: () => {
          return true;
        },
      },
      {
        name: 'Users',
        icon: 'people',
        optionIndex: 0,
        options: [
          {
            name: 'Companies',
            icon: 'business',
          },
          {
            name: 'Teams',
            icon: 'group_work',
          },
          {
            name: 'Employees',
            icon: 'person',
          },
          {
            name: 'Administration',
            icon: 'supervised_user_circle',
          }
        ],
        menu: () => {
          return true;
        },
        dashboard: () => {
          return true;
        },
      },
      {
        name: 'Attributes',
        icon: 'edit_attributes',
        optionIndex: 0,
        options: [
          {
            name: 'Global Attributes',
            icon: 'label',
          },
          {
            name: 'Product Categories',
            icon: 'shop_two',
          },
        ],
        menu: () => {
          return false;
        },
        dashboard: () => {
          return false;
        },
      },
      {
        name: 'Data',
        icon: 'storage',
        optionIndex: 0,
        options: [
          {
            name: 'Locations',
            icon: 'location_on',
          },
          {
            name: 'Files',
            icon: 'file_copy',
          }
        ],
        menu: () => {
          return true;
        },
        dashboard: () => {
          return true;
        },
      },
      {
        name: 'Memos',
        icon: 'list_alt',
        databaseEntries: 'memo',
        optionIndex: 0,
        menu: () => {
          return false;
        },
        dashboard: () => {
          return false;
        },
      },
      {
        name: 'Account',
        icon: 'account_circle',
        optionIndex: 0,
        menu: () => {
          return true;
        },
        dashboard: () => {
          return false;
        },
      }
    ] as any[],
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


  showPage(page: any) {
    setTimeout(() => {
      this.dashboard.page = undefined;
      setTimeout(() => {
        this.dashboard.page = page;
        this.dashboard.showMenu = false;
      }, 0);
    }, 0);

  }

  newConfiguration?: NgAppSettingsEntity;
  newLanguage?: NgLanguageEntity;
  jsonData?: JsonDataService;
  currentBackendError?: BackendAdminError;
  backendErrors: BackendAdminError[] = [];
  private mapComponent?: PoiMapComponent;
  mapLayers: MapLayer[] = [];
  private fallbackImage = 'assets/svg/app_logo.svg';
  taskTypes = NgTaskTypes;
  mainTaskTypes = NgMainTaskTypes;
  subTaskTypes = NgSubTaskTypes;
  companyTypes = NgCompanyTypes;
  arModelTypes = NgTaskArModelTypes;
  configVisible = false;
  editCompanyComponent?: EditCompanyComponent;
  editFileComponent?: EditFileComponent;
  editMemoComponent?: EditMemoComponent;
  editPoiComponent?: EditPoiComponent;
  editTaskComponent?: EditTaskComponent;

  apiData: any = {
    'task': [] as NgTaskEntity[],
    'company': [] as NgCompanyEntity[],
    'memo': [] as NgMemoEntity[],
    'poi': [] as NgPoiEntity[],
    'file': [] as NgFileEntity[],
    'user': [] as NgUserEntity[],
    'user-group': [] as NgTaskEntity[]
  };
  arModelDistance = {
    min: 0.1,
    max: 50,
    step: .1
  };

  attributeTypes = NgAttributeTypes;
  companyAttributes: any = {
    'main-attribute': ['icon-text']
  }


  editTask?: NgTaskEntity;


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
    return tasks?.filter((task: NgTaskEntity) => !task.parentId);
  }

  subTasks(task: NgTaskEntity, tasks = this.apiData.task): NgTaskEntity[] {
    if (task.id) {
      return tasks.filter((subTask: NgTaskEntity) => subTask.parentId === task.id);
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

  filePath(file: NgFileEntity) {
    if (file.path) {
      return this.url() + file.path;
    }
    return this.fallbackImage;
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

  deleteEntry(entry: NgApiEntity, onSuccess?: () => void, onError?: (error: any) => void, onDeny?: () => void) {
    if (confirm('Bist du dir sicher?')) {
      if (entry.delete) {
        entry.delete(() => {
          if (onSuccess) {
            onSuccess();
          }
        }, (error: any) => {
          if (onError) {
            onError(error);
          }
        });
      } else {
        console.error('Con not delete entry:', entry);
      }

    } else {
      if (onDeny) {
        onDeny();
      }
    }
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

  poiDistance(poi: NgPoiEntity, latitude: number, longitude: number) {
    let distance = 0;
    if (poi.latitude && poi.latitude) {
      distance = this.distance({
        latitude: poi.latitude,
        longitude: poi.longitude
      }, {
        latitude: latitude,
        longitude: longitude
      });
    }
    return distance.toFixed(2);
  }

  formFieldType(column: string) {
    const fields: any = {
      'poi': {
        single: ['poiId'],
        multiple: ['poiIds'],
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
      newTask.parentId = parentNode.id;
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


}
