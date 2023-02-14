import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSelectComponent } from './icon-select/icon-select.component';
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {BrowserModule} from "@angular/platform-browser";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { CarouselComponent } from './carousel/carousel.component';
import {MarkerPreviewComponent} from "./marker-preview/marker-preview.component";

@NgModule({
  declarations: [
    IconSelectComponent,
    CarouselComponent,
    MarkerPreviewComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [
    FormBuilder
  ],
  exports: [
    IconSelectComponent,
    CarouselComponent,
    MarkerPreviewComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AngularWidgetsModule { }
