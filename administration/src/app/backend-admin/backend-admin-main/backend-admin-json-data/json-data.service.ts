import { Injectable } from '@angular/core';
import { NgApiService } from '../../../../../../angular-classes/ng.api.service';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {


  dataAttributes: string[] = [];
  currentAttribute?: string;
  currentDataAttributes: string[] = [];
  currentDataEntries: any[] = [];
  currentDataChildren: any = {};
  data: any;

  parentKeys: any = {
    'categories': 'categoryId'
  }

  editEntry?: any;
  public parentId?: any
  public parentKey?: string;

  constructor() {
  }

  getParentId(data:  any, key = this.currentAttribute): number | undefined {
    const parentKey = this.getParentKey(key);
    if(data && parentKey && data[parentKey]){
      return data[parentKey];
    }
    return undefined;
  }

  getParentKey(key = this.currentAttribute): string | undefined {
    return key !== undefined ? this.parentKeys[key] : undefined;
  }

  parseDataAttributes(data: any) {
    const attributes: string[] = [];
    for (const key in data) {
      attributes.push(key);
    }
    this.data = data;
    this.dataAttributes = attributes;
    if (!this.currentAttribute && this.dataAttributes.length) {
      this.selectAttribute(this.dataAttributes[0]);
    }
  }

  selectAttribute(attribute?: string) {
    this.currentAttribute = attribute;
    this.currentDataAttributes = [];
    this.currentDataEntries = [];
    this.currentDataChildren = {};
    if (this.currentAttribute) {
      if (this.data && this.data[this.currentAttribute]) {
        this.currentDataEntries = this.data[this.currentAttribute].filter((entry: any) => {
          for (const attr in entry) {
            this.addDataAttribute(attr);
          }
          if (this.currentAttribute && this.parentKeys[this.currentAttribute] && entry[this.parentKeys[this.currentAttribute]]) {
            if (!this.currentDataChildren[entry[this.parentKeys[this.currentAttribute]]]) {
              this.currentDataChildren[entry[this.parentKeys[this.currentAttribute]]] = [];
            }
            this.currentDataChildren[entry[this.parentKeys[this.currentAttribute]]].push(entry);
            return false;
          }
          return true;
        })
      }
    }
  }

  addDataAttribute(attribute: string) {
    const exist = this.currentDataAttributes.find(attr => attr === attribute);
    if (!exist) {
      this.currentDataAttributes.push(attribute);
    }
  }

  newEntry(parentId = this.parentId) {
    this.editEntry = {};
    for (const attr of this.currentDataAttributes) {
      this.editEntry[attr] = '';
      if (parentId && this.currentAttribute && this.parentKeys[this.currentAttribute]) {
        this.editEntry[this.parentKeys[this.currentAttribute]] = parentId;
      }
    }
  }


  saveEntry(api: NgApiService, entry = this.editEntry) {
    this.editEntry = entry;
    if (entry && this.currentAttribute) {
      if (entry.id) {
        api.put(this.currentAttribute, entry, (result) => {
          this.editEntry = result;
        }, () => {
        }, true);
      } else {
        api.post(this.currentAttribute, entry, (result) => {
          this.editEntry = result;
        }, () => {
        }, true);
      }
    }
  }

  deleteEntryById(api: NgApiService, id: number) {
    if(this.currentAttribute && id && confirm('Bist du dir sicher?')){
      api.delete(this.currentAttribute, id, (result) => {
        this.editEntry = undefined;
      }, () => {
      }, true);
    }
  }
}
