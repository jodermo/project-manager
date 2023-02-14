import { Component, Input, SimpleChanges } from '@angular/core';
import { MaterialComponent } from '../material.component';
import { ThreeMeshPhysicalMaterial } from './three-mesh-physical-material';
import { Color, MeshPhysicalMaterial, NormalMapTypes, TangentSpaceNormalMap, Texture, Vector2 } from 'three';
import { ThreeComponent } from '../../three.component';
import { ThreeService } from '../../three.service';
import { ComponentService } from '../../services/component.service';
import { MaterialService } from '../../services/material.service';


@Component({
  selector: 'three-mesh-physical-material',
  template: '',
})
export class MeshPhysicalMaterialComponent extends ThreeMeshPhysicalMaterial implements  ThreeComponent {
  @Input() color: Color = new Color(0xffffff);

  /*


  @Input() alphaMap: Texture | null = null;
  @Input() aoMap: Texture | null = null;
  @Input() aoMapIntensity: number = 1;
  @Input() attenuationColor: Color = new Color(0x000000);
  @Input() attenuationDistance: number = 0.0;
  @Input() bumpMap: Texture | null = null;
  @Input() bumpScale: number = 1;
  @Input() clearcoat: number = 0;
  @Input() clearcoatMap: Texture | null = null;
  @Input() clearcoatNormalMap: Texture | null = null;
  @Input() clearcoatNormalScale: Vector2 = new Vector2(1, 1);
  @Input() clearcoatRoughness: number = 0;
  @Input() clearcoatRoughnessMap: Texture | null = null;

  @Input() displacementBias: number = 0;
  @Input() displacementMap: Texture | null = null;
  @Input() displacementScale: number = 1;
  @Input() emissive: Color = new Color(0x000000);
  @Input() emissiveIntensity: number = 1;
  @Input() emissiveMap: Texture | null = null;
  @Input() envMap: Texture | null = null;
  @Input() envMapIntensity: number = 1;
  @Input() flatShading: boolean = false;
  @Input() ior: number = 1.5;
  @Input() lightMap: Texture | null = null;
  @Input() lightMapIntensity: number = 1;
  @Input() map: Texture | null = null;
  @Input() metalness: number = 0;
  @Input() metalnessMap: Texture | null = null;
  @Input() normalMap: Texture | null = null;
  @Input() normalMapType: NormalMapTypes = TangentSpaceNormalMap;
  @Input() normalScale: Vector2 = new Vector2( 1, 1 );
  @Input() reflectivity: number = 0.5;
  @Input() roughness: number = 1;
  @Input() roughnessMap: Texture | null = null;
  @Input() sheen: number = 0.0;
  @Input() sheenColor: Color = new Color( 0x000000 );
  @Input() sheenColorMap: Texture | null = null;
  @Input() sheenRoughness: number = 1.0;
  @Input() sheenRoughnessMap: Texture | null = null;
  @Input() specularColor: Color = new Color(1, 1, 1);
  @Input() specularColorMap: Texture | null = null;
  @Input() specularIntensity: number = 1.0;
  @Input() specularIntensityMap: Texture | null = null;
  @Input() thickness: number = 0.01;
  @Input() thicknessMap: Texture | null = null;
  @Input() transmission: number = 0;
  @Input() transmissionMap: Texture | null = null;
  @Input() wireframe: boolean = false;
  @Input() wireframeLinecap: string = 'round';
  @Input() wireframeLinejoin: string = 'round';
  @Input() wireframeLinewidth: number = 1;

  isMeshStandardMaterial = true;
   */


  constructor(
    public three: ThreeService,
    public componentService: ComponentService,
    public materialService: MaterialService
  ) {
    super(materialService);
    componentService.add(this);
    materialService.add(this);
  }
}
