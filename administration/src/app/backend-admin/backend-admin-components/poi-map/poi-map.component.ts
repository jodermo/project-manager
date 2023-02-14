import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { fromLonLat } from 'ol/proj';
import { View, Map, Collection } from 'ol';
import * as olProj from 'ol/proj';
import { Layer } from 'ol/layer';
import { transform } from 'ol/proj.js';
import { HttpClient } from '@angular/common/http';
import Feature, { FeatureLike } from 'ol/Feature';
import Point from 'ol/geom/Point';
import { NgPoiEntity } from '../../../../../../angular-classes/angular-entities/ng.poi.entity';
import Projection from 'ol/proj/Projection';
import { ClientDeviceCoordinate, ClientDeviceService } from '../../../client-device/client-device.service';
import { MapLayer } from '../../classes/map-layer';
import { BackendAdminService } from '../../backend-admin.service';
import { NgFileEntity } from '../../../../../../angular-classes/angular-entities/ng.file.entity';

export class MapPoi extends ClientDeviceCoordinate {
  constructor(
    public name: string,
    public latitude: number,
    public longitude: number,
    public icon = '/assets/images/marker/Drachen_point_small_48.png',
    public dataPoi?: NgPoiEntity,
    public feature?: Feature
  ) {
    super()
  }

  show() {
    if (this.feature) {
      // console.log('show', this.feature);
    }
  }

  hide() {
    if (this.feature) {
      //  console.log('hide', this.feature);

    }
  }
}

@Component({
  selector: 'app-poi-map',
  templateUrl: './poi-map.component.html',
  styleUrls: ['./poi-map.component.scss']
})
export class PoiMapComponent implements AfterViewInit, OnChanges {
  @ViewChild('map', {static: false}) mapElementRef?: ElementRef;
  mapElement?: HTMLElement;


  @Input() pois: NgPoiEntity[] = [];
  @Input() poi?: NgPoiEntity;
  @Input() poiIds?: number[];
  @Input() poiId?: number;
  @Input() positionMarker = false;
  @Input() userInteraction = false;
  @Input() showCursor = false;
  @Input() updatePoi = false;
  @Input() autoSavePoi = false;
  @Input() autoUpdateMyLocation = false;
  savePoiTimeout?: any;

  viewProjection: Projection | string | undefined = 'EPSG:3857';

  id = 'map';

  width = 0;
  height = 0;
  canvasSize = 0;
  layerSize = 0;

  mapWidth = 20;
  mapHeight = 20;
  projection = {
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    width: 0,
    height: 0,
  };

  @Input() zoom = 16;
  @Input() minZoom = 14;
  @Input() maxZoom = 20;
  @Input() zoomStep = .25;
  radius = 0.002;
  center = [0, 0];

  @Input() latitude?: number;
  @Input() longitude?: number;
  @Input() rotation = 0;

  map?: Map;
  view?: View;
  layers: Layer[] = [];
  layer?: Layer;
  gameLayers: MapLayer[] = [];
  menuLayers: MapLayer[] = [];
  layerOption?: any;

  markerLayer?: MapLayer;
  myMarker?: Feature;

  @Input() mapPois: MapPoi[] = [];
  @Input() mapPoi?: MapPoi;

  mouse = {
    clickFeature: (undefined as (FeatureLike | undefined)),
    hoverFeature: (undefined as (FeatureLike | undefined)),
    hoverLayer: (undefined as (Layer | undefined)),
    coordinate: undefined
  };
  isUpdating = false;
  loaded = false;


  @Output() onClickPoi = new EventEmitter<NgPoiEntity>();
  @Output() onClickLayer = new EventEmitter<any>();

  constructor(public adminService: BackendAdminService, public clientDevice: ClientDeviceService, private http: HttpClient) {
    this.id = this.id + '_' + Date.now() + '_' + Math.floor(Math.random() * 10000000);
    this.clientDevice.on('locationchange', () => {
      this.setMyLocation();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
      this.setMyLocation();

    }, 500);

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.markerLayer) {
      this.createMarkers();
    }
  }

  initMap() {
    this.adminService.setMapComponent(this);
    if (this.mapElementRef && this.mapElementRef.nativeElement.clientHeight && !this.loaded) {
      this.mapElement = this.mapElementRef.nativeElement;
      this.createMap();
      this.loaded = true;
    }
  }

  createMap() {
    if (this.mapElement) {
      this.initLatLon();
      this.getMapSize();
      this.createView();
      this.initLayers();
      this.createMarkers();

      if (!this.userInteraction) {
        this.map = new Map({
          target: this.mapElement,
          layers: this.layers,
          view: this.view,
          controls: [],
          interactions: new Collection(),
          moveTolerance: 5
        });
      } else {
        this.map = new Map({
          controls: [],
          target: this.mapElement,
          layers: this.layers,
          view: this.view,
        });
      }
      this.getLatLon();
      this.updateProjection();
      this.update();
      this.map.on('postrender', (e: any) => {
        this.updateMap();
      });

      this.map.on('click', (e: any) => {
        this.onPointClick(e);
      });
      this.map.on('pointermove', (e: any) => {
        this.onPointMove(e);
      });
    }
  }

  initLatLon() {
    if (!this.latitude) {
      this.latitude = this.clientDevice.latitude;
    }
    if (!this.longitude) {
      this.longitude = this.clientDevice.longitude;
    }
  }

  updateMap() {
    this.isUpdating = true;
    this.initMap();
    this.getLatLon();
    this.setZoom();
    this.setRotation();
    this.centerMap();
    this.update();
    this.map?.setTarget(this.id);
    if (this.updatePoi && this.poi) {
      const coordinates = this.getLatLon();
      if (coordinates.latitude) {
        this.poi.latitude = coordinates.latitude;
      }
      if (coordinates.longitude) {
        this.poi.longitude = coordinates.longitude;
      }
      if (this.autoSavePoi) {
        if (this.savePoiTimeout) {
          clearTimeout(this.savePoiTimeout);
        }
        this.savePoiTimeout = setTimeout(() => {
          if (this.poi?.id) {
            this.poi.update();
          }
        }, 500);
      }
    }
    setTimeout(() => {
      this.isUpdating = false;
      this.map?.setTarget(this.id);
    }, 0);
  }

  zoomIn(zoomStep = this.zoomStep) {
    if (this.userInteraction) {
      this.setZoom(this.zoom + zoomStep);
    }
  }

  zoomOut(zoomStep = this.zoomStep) {
    if (this.userInteraction) {
      this.setZoom(this.zoom - zoomStep);
    }
  }


  private initLayers() {
    this.addLayer(new MapLayer(this.http, this.adminService, 'Background'));
    //  this.addLayer(new MapLayer(this.http, this.adminService, 'WMS', 'Old Map', 'https://www.wms.nrw.de/geobasis/wms_nw_tranchot')).setIcon('map');
    this.addLayer(new MapLayer(this.http, this.adminService, 'OSM')).setIcon('location_on');
    this.addLayer(new MapLayer(this.http, this.adminService, 'Satellite')).setIcon('satellite');

  }

  private createMarkers() {
    this.markerLayer?.source.clear();
    if (!this.markerLayer) {
      this.markerLayer = this.addLayer(new MapLayer(this.http, this.adminService, 'Marker')).setIcon('satellite');
      this.markerLayer.layer.setVisible(true);
    }
    if (this.clientDevice.latitude && this.clientDevice.longitude && this.positionMarker) {
      this.markerLayer.addMarker(this.clientDevice.latitude, this.clientDevice.longitude, '/assets/images/marker/myMarker.png', undefined, (marker: Feature) => {
        this.myMarker = marker;
      });
    }
    this.initPois();
  }

  createView() {
    if (this.latitude && this.longitude) {
      this.center = fromLonLat([this.longitude, this.latitude]);
      this.view = new View({
        projection: this.viewProjection,
        center: this.center,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        zoom: this.zoom
      });
    }
  }

  initPois() {

    if (!this.pois) {
      if (this.poi) {
        this.pois = [this.poi];
      } else if (this.poiId && !this.poiIds) {
        this.poiIds = [this.poiId];
      }
      if (this.adminService.apiData['poi']) {
        if (!this.pois && this.poiIds) {
          this.pois = [];
          for (const id of this.poiIds) {
            const poi = this.adminService.apiData['poi'].find((poi: NgPoiEntity)  => poi.id === id);
            if (poi) {
              this.pois.push(poi);
            }
          }
        } else if (!this.pois) {
          this.pois = this.adminService.apiData['poi'];
        }
      }
    }
    this.mapPois = [];
    if (this.pois) {
      for (const poi of this.pois) {
        if (!this.mapPois.find(mapPoi => poi === mapPoi.dataPoi)) {
          const image = this.adminService.getFileById(poi.markerImageId);
          const iconPath = image && this.adminService.filePath(image) ? this.adminService.filePath(image) : '/assets/images/marker/Drachen_point_small_48.png';
          const mapPoi = new MapPoi(
            poi.name,
            poi.latitude,
            poi.longitude,
            iconPath,
            poi
          );
          this.addPoi(mapPoi);
        }
      }
    }
  }

  addPoi(poi: MapPoi) {
    this.mapPois.push(poi);
    if (this.markerLayer) {
      this.markerLayer.addMarker(poi.latitude, poi.longitude, poi.icon, poi.dataPoi, (marker: Feature) => {
        poi.feature = marker;
      });
    }
  }

  addLayer(mapLayer: MapLayer) {
    this.adminService.mapLayers.push(mapLayer);
    if (mapLayer.type !== 'Background' && mapLayer.type !== 'Marker') {
      this.menuLayers.push(mapLayer);
    }
    if (mapLayer && mapLayer.layer) {
      this.layers.push(mapLayer.layer);
      if (this.map) {
        this.map.addLayer(mapLayer.layer);
      }
    }
    mapLayer.update();
    if (mapLayer.type !== 'Marker' && mapLayer.type !== 'Background') {
      this.showMenuLayer(mapLayer);
    }
    return mapLayer;
  }

  showMenuLayer(gameLayer: MapLayer) {
    this.hideAllMenuLayer();
    gameLayer.visible = true;
    gameLayer.layer?.setVisible(true);
  }


  getMapSize() {
    this.canvasSize = this.mapWidth * 100;
    if (this.map && this.mapElement?.parentElement) {
      this.width = this.mapElement.parentElement.clientWidth;
      this.height = this.mapElement.parentElement.clientHeight;

      this.layerSize = this.width;
      if (this.height < this.layerSize) {
        this.layerSize = this.height;
      }
      this.mapElement.style.width = this.layerSize + 'px';
      this.mapElement.style.height = this.layerSize + 'px';
      this.updateProjection();
    }
  }

  centerMap(latitude = this.latitude, longitude = this.longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    if (this.latitude && this.longitude) {
      this.center = fromLonLat([this.longitude, this.latitude]);
      if (this.map) {
        this.map.getView().setCenter(transform([this.longitude, this.latitude], 'EPSG:4326', 'EPSG:3857'));
      }

      this.update();
    }

  }

  setRotation(rotation = this.rotation) {
    this.rotation = rotation;
    if (this.map) {
      this.map.getView().setRotation(this.rotation * (Math.PI / 180));
    }
    this.update();
  }

  setZoom(zoom = this.zoom) {
    this.zoom = zoom;
    if (this.zoom > this.maxZoom) {
      this.zoom = this.maxZoom;
    }
    if (this.zoom < this.minZoom) {
      this.zoom = this.minZoom;
    }
    if (this.map) {
      this.map.getView().setZoom(zoom);
    }
    this.update();
  }


  getLatLon() {
    if (this.map) {
      const center = this.map.getView().getCenter();
      if (center) {
        const lonLat = olProj.transform(center, this.map.getView().getProjection(), 'EPSG:4326');
        this.longitude = lonLat[0];
        this.latitude = lonLat[1];
      }
    }
    return {
      latitude: this.latitude,
      longitude: this.longitude
    };
  }

  update() {

  }


  private hideAllMenuLayer() {
    for (const gameLayer of this.adminService.mapLayers) {
      this.showMapLayer(gameLayer);
    }
    for (const gameLayer of this.menuLayers) {
      this.hideMapLayer(gameLayer);
    }
  }

  private showMapLayer(gameLayer: MapLayer) {
    gameLayer.layer?.setVisible(true);
    gameLayer.visible = true;
  }

  private hideMapLayer(gameLayer: MapLayer) {
    if (gameLayer.type !== 'WMS') {
      gameLayer.layer?.setVisible(false);
      gameLayer.visible = false;
    }
  }

  private updateProjection() {
    if (this.map) {
      const boundingBox = this.map.getView().calculateExtent(this.map.getSize());
      this.projection.left = boundingBox[0];
      this.projection.bottom = boundingBox[1];
      this.projection.right = boundingBox[2];
      this.projection.top = boundingBox[3];
      this.projection.width = this.projection.right - this.projection.left;
      this.projection.height = this.projection.top - this.projection.bottom;
      this.zoom = this.map.getView().getZoom() || this.zoom;
    }
  }

  private onPointMove(evt: any) {
    this.mouse.coordinate = evt.coordinate;
    if (this.map) {
      const interactionData = this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
          return {feature, layer};
        }
      );
      if (interactionData?.layer) {
        this.mouse.hoverLayer = interactionData.layer;
      } else {
        this.mouse.hoverLayer = undefined;
      }
      if (interactionData?.feature) {
        this.mouse.hoverFeature = interactionData?.feature;

      } else {
        this.mouse.hoverFeature = undefined;
      }
    }

  }

  private onPointClick(evt: any) {
    this.onPointMove(evt);
    if (this.mouse.hoverLayer) {
      this.clickLayer(this.mouse.hoverLayer);
    }
    if (this.mouse.hoverFeature) {
      this.onClickFeature(this.mouse.hoverFeature);
    }

  }

  private clickLayer(layer: any) {
    this.onClickLayer.emit(layer);
  }

  private onClickFeature(feature: any) {
    const poi = this.mapPois.find(poi => (poi.feature && (poi.feature as any).ol_uid === feature.ol_uid));
    if (poi) {
      this.clickPoi(poi);
    }
  }

  clickPoi(mapPoi: MapPoi) {
    this.mapPoi = mapPoi;
    this.onClickPoi.emit(mapPoi.dataPoi);
  }

  centerPoi(poi: NgPoiEntity) {
    this.autoUpdateMyLocation = false;
    if (poi) {
      this.centerMap(poi.latitude, poi.longitude);
    }
  }

  setMyLocation(autoUpdateMyLocation = this.autoUpdateMyLocation) {
    this.autoUpdateMyLocation = autoUpdateMyLocation;
    if (this.clientDevice && this.autoUpdateMyLocation) {
      this.centerMap(this.clientDevice.latitude, this.clientDevice.longitude);
    }
    if (this.myMarker) {
      this.myMarker.set('geometry', new Point(fromLonLat([this.clientDevice.longitude, this.clientDevice.latitude])));
    }

  }
}
