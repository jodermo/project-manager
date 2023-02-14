import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import WMSCapabilities from 'ol/format/WMSCapabilities';
import { TileWMS, Vector } from 'ol/source';
import OSM, { ATTRIBUTION } from 'ol/source/OSM';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { BackendAdminService } from '../backend-admin.service';

export type GameLayerType = 'Background' | 'WMS' | 'Satellite' | 'OSM' | 'Marker' | 'Vector';

export class MapLayer {

  layer?: any;
  source?: any;
  icon = 'map';
  iconSrc?: string;
  visible = false;
  minZoom = 0;
  maxZoom = 24;
  wmsParser = new WMSCapabilities();
  private maptilerKey = 'TDTnoeQZeAUcQnKebrxv';

  constructor(private http: HttpClient, public adminService: BackendAdminService, public type: GameLayerType, public name: string = type, public url?: string) {
    this.init();
  }

  private init() {
    this.createSource(() => {
      this.createLayer();
    });
  }

  setIcon(icon = this.icon) {
    this.icon = icon;
    return this;
  }

  setIconSrc(iconSrc = this.iconSrc) {
    this.iconSrc = iconSrc;
    return this;
  }

  private createSource(onSuccess: () => void) {
    if (this.type === 'Background') {
      this.backgroundSource(onSuccess);
    } else if (this.type === 'WMS' && this.url) {
      this.wmsSource(onSuccess);
    } else if (this.type === 'Satellite') {
      this.satelliteSource(onSuccess);
    } else if (this.type === 'Marker') {
      this.markerSource(onSuccess);
    } else {
      this.osmSource(onSuccess);
    }
  }

  private backgroundSource(onSuccess: () => void) {
    this.source = new XYZ({
      url: this.url || "assets/images/background_color.png"
    });
    onSuccess();
  }

  private wmsSource(onSuccess: () => void) {
    if (this.url && this.validUrl(this.url)) {
      this.getWmsCapabilities(this.url).subscribe((xmlString) => {
        const result = this.wmsParser.read(xmlString);
        if (result.Capability) {
          const capability = result.Capability;
          const layers = capability.Layer.Layer;
          let layersString = '';
          for (const layer of layers) {
            layersString += layer.Name + ',';
          }
          if (layersString.length) {
            layersString = layersString.slice(0, -1)
          }
          const curl = this.url +
            '?SERVICE=WMS' +
            '&VERSION=1.3.0' +
            '&REQUEST=GetCapabilities' +
            '&TRANSPARENT=true' +
            '&LAYERS=' + layersString;

          this.source = new TileWMS({
            url: curl,
            params: {'TILED': true},
            serverType: 'geoserver',
            transition: 0,
            crossOrigin: "Anonymous",
          });
        }
        this.setLoader();
        onSuccess();
      });
    }
    onSuccess();
  }

  private markerSource(onSuccess: () => void) {
    this.source = new VectorSource({
      features: []
    });
    onSuccess();
  }

  private satelliteSource(onSuccess: () => void) {
    this.source = new XYZ({
      attributions: '',
      url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + this.maptilerKey,
      maxZoom: 20,
      crossOrigin: "Anonymous"
    });
    onSuccess();
  }

  private osmSource(onSuccess: () => void) {
    this.source = new OSM({
      attributions: '',
      opaque: false
    });
    onSuccess();
  }

  private createLayer() {

    if (this.source) {
      if (this.type === 'Marker' || this.type === 'Vector') {
        this.layer = new VectorLayer({
          source: this.source,
        });
      } else {
        this.layer = new TileLayer({
          minZoom: this.minZoom,
          maxZoom: this.maxZoom,
          source: this.source
        });
      }
    }

  }

  addMarker(latitude: number, longitude: number, url = this.url, data: any = {}, onSuccess?: (marker: Feature)=>void) {
    this.url = url;
    if (this.source && this.url) {
      this.adminService.canvasImage(this.url, 46, 46, (dataUrl: string) => {
        const featureOptions = {
          geometry: new Point(fromLonLat([longitude, latitude])),
          data: data
        }
        const marker = new Feature(featureOptions);
        const iconStyle = new Style({
          image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: dataUrl
          }),
        });
        marker.setStyle(iconStyle);
        this.source.addFeature(marker);
        if(onSuccess){
          onSuccess(marker);
        }
      });

    }
  }

  private setLoader() {
    if (this.layer instanceof TileLayer) {
      this.source.on('tileloadstart', (e: any) => {
        // console.log('tileloadstart', e);
      });
      this.source.on('tileloadend', (e: any) => {
        // console.log('tileloadend', e);
      });
      this.source.on('tileloaderror', (e: any) => {
        console.log('tileloaderror', e);
      });
    }

  }

  private getWmsCapabilities(url: string, request = 'GetCapabilities'): Observable<any> {
    return this.http.get(url + '?SERVICE=WMS&VERSION=1.3.0&REQUEST=' + request, {responseType: 'text'});
  }

  validUrl(url: string) {
    return (url && url.length > 0);
  }

  update() {
    this.layer?.setVisible(this.visible);
  }


}
