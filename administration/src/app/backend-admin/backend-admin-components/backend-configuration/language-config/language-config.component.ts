import { Component, OnInit } from '@angular/core';
import { BackendAdminService } from '../../../backend-admin.service';
import { NgLanguageEntity } from '../../../../../../../angular-classes/angular-entities/ng.language.entity';

@Component({
  selector: 'app-language-config',
  templateUrl: './language-config.component.html',
  styleUrls: ['./language-config.component.scss']
})
export class LanguageConfigComponent implements OnInit {

  constructor(public adminService: BackendAdminService) {
  }

  ngOnInit(): void {
  }

  defaultLanguage(defaultLanguageId: number) {

    if (defaultLanguageId) {
      const language = this.adminService.languages.find(language => language.id === defaultLanguageId);
      return language ? (language.name + ' (' + language.iso + ')') : '-';
    }
    return '';
  }

  deleteLanguage(language: NgLanguageEntity) {
    this.adminService.load();
    language.delete(() => {
      for (let i = 0; i < this.adminService.languages.length; i++) {
        if (this.adminService.languages[i].id === language.id) {
          this.adminService.languages.splice(i, 1);
        }
      }
      this.adminService.loaded();
    });
  }
}
