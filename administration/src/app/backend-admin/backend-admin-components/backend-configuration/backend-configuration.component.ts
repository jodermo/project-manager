import { Component } from '@angular/core';
import { BackendAdminService } from '../../backend-admin.service';

@Component({
  selector: 'app-backend-configuration',
  templateUrl: './backend-configuration.component.html',
  styleUrls: ['./backend-configuration.component.scss']
})
export class BackendConfigurationComponent {

  constructor(public adminService: BackendAdminService) {
    this.adminService.initNewConfiguration();
  }

  canSave() {
    return (this.adminService.newConfiguration && this.adminService.newConfiguration.name && this.adminService.newConfiguration.defaultLanguageId);
  }

}
