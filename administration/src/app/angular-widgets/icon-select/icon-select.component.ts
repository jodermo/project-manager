import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIcons} from "./icons/mat-icons";

@Component({
  selector: 'app-icon-select',
  templateUrl: './icon-select.component.html',
  styleUrls: ['./icon-select.component.scss']
})
export class IconSelectComponent implements OnInit {


  iconCategories = MatIcons.categories;
  availableCategories: any[] = [];
  searchQuery?: string;
  iconsCount = 0;
  showSearch = false;

  @Input() selectedIcon?: any;
  @Input() label = 'Icon';
  @Input() searchLabel = 'Search';

  @Output() onSelectIcon = new EventEmitter<string>();
  @Output() onChooseIcon = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
    this.changeSearchQuery();
  }

  changeSearchQuery() {
    const availableCategories: any[] = [];
    this.iconCategories.map((iconCategory) => {
      let addedCategory: any = undefined;
      if (!this.searchQuery) {
        addedCategory = iconCategory;
        availableCategories.push(iconCategory);
      } else if (iconCategory.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        addedCategory = iconCategory;
        availableCategories.push(iconCategory);
      }
      if (iconCategory !== addedCategory) {
        const categoryClone = Object.assign({}, iconCategory);
        categoryClone.icons = iconCategory.icons.filter(icon => this.searchQuery ? icon.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true);
        if (categoryClone.icons.length) {
          availableCategories.push(categoryClone);
        }
      }
    });
    this.availableCategories = availableCategories;
    this.iconsCount = 0;
    for (const iconCategory of this.availableCategories) {
      this.iconsCount += iconCategory.icons.length;
    }
  }

  chooseIcon() {
    if (this.selectedIcon) {
      this.onChooseIcon.emit(this.selectedIcon);
      this.initSelection();
    }
  }

  initSelection() {
    this.searchQuery = undefined;
    this.showSearch = false;
    this.changeSearchQuery();
  }

  onChange() {
    this.onSelectIcon.emit(this.selectedIcon);
  }
}
