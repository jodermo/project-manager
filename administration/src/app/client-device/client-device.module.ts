import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDeviceService } from './client-device.service';
import { ClientDeviceOrientationComponent } from './client-device-orientation/client-device-orientation.component';
import { ClientDeviceCompassComponent } from './client-device-compass/client-device-compass.component';
import { ClientDeviceUserAgentComponent } from './client-device-user-agent/client-device-user-agent.component';
import { ClientDeviceCustomizationComponent } from './client-device-customization/client-device-customization.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ClientDeviceOrientationComponent,
    ClientDeviceCompassComponent,
    ClientDeviceUserAgentComponent,
    ClientDeviceCustomizationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSliderModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatPaginatorModule,
    MatGridListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    ClientDeviceOrientationComponent,
    ClientDeviceCompassComponent,
    ClientDeviceUserAgentComponent,
    ClientDeviceCustomizationComponent
  ],
  providers: [
    ClientDeviceService
  ]
})
export class ClientDeviceModule {
}
