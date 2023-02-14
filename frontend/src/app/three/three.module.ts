import { NgModule } from '@angular/core';
import { ThreeService } from './three.service';
import { GeometryComponent } from './geometry/geometry.component';
import { ObjectComponent } from './object/object.component';
import { PerspectiveCameraComponent } from './object/camera/perspective-camera/perspective-camera.component';
import { MaterialComponent } from './material/material.component';
import { ColorComponent } from './color/color.component';
import { SceneComponent } from './scene/scene.component';
import { CameraComponent } from './object/camera/camera.component';
import { CameraControlsComponent } from './util/camera-controls/camera-controls.component';
import { ThreeComponent } from './three.component';
import { BoxGeometryComponent } from './geometry/box-geometry/box-geometry.component';
import { MeshComponent } from './object/mesh/mesh.component';
import { MeshPhysicalMaterialComponent } from './material/mesh-physical-material/mesh-physical-material.component';
import { LightComponent } from './object/light/light.component';
import { HemisphereLightComponent } from './object/light/hemisphere-light/hemisphere-light.component';
import { ComponentService } from './services/component.service';
import { ObjectService } from './services/object.service';
import { MaterialService } from './services/material.service';
import { GeometryService } from './services/geometry.service';
import { CameraService } from './services/camera.service';
import { LightService } from './services/light.service';
import { ColorService } from './services/color.service';
import { FileObjectComponent } from './object/file-object/file-object.component';
import { ColladaComponent } from './object/file-object/collada/collada.component';


@NgModule({
  declarations: [
    ThreeComponent,
    SceneComponent,
    CameraComponent,
    PerspectiveCameraComponent,
    CameraControlsComponent,
    ObjectComponent,
    MeshComponent,
    GeometryComponent,
    MaterialComponent,
    ColorComponent,
    BoxGeometryComponent,
    MeshPhysicalMaterialComponent,
    LightComponent,
    HemisphereLightComponent,
    FileObjectComponent,
    ColladaComponent
  ],
  imports: [],
  exports: [
    ThreeComponent,
    SceneComponent,
    CameraComponent,
    PerspectiveCameraComponent,
    CameraControlsComponent,
    ObjectComponent,
    MeshComponent,
    GeometryComponent,
    MaterialComponent,
    ColorComponent,
    BoxGeometryComponent,
    MeshPhysicalMaterialComponent,
    LightComponent,
    HemisphereLightComponent,
    FileObjectComponent,
    ColladaComponent
  ],
  providers: [
    ThreeService,
    ComponentService,
    ObjectService,
    MaterialService,
    GeometryService,
    CameraService,
    LightService,
    ColorService
  ]
})
export class ThreeModule {
}
