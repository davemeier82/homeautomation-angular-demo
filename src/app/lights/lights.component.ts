import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '@ngrx/store';
import {map} from 'rxjs';
import {ChangeDimmingLevel, SwitchRelay} from '../actions/device.actions';
import {DeviceState} from '../app.states';
import {StoreService} from '../store/store.service';
import {environment} from "../../environments/environment";

export interface LightData {
  deviceId: string;
  deviceType: string;
  propType: string;
  propertyId: string;
  label: string;
  floor: string;
  state: boolean;
  lastUpdated: Date;
  dimmingLevelInPercent: number;
  dimmingLevelLastUpdated: Date;
}

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.scss']
})
export class LightsComponent implements OnInit {

  dataSource = new MatTableDataSource<LightData>()
  displayedColumns: string[] = ['label', 'floor', 'state', 'level', 'lastUpdated'];

  constructor(private storeService: StoreService, private store: Store<DeviceState>) {

    storeService.getDevicesByApplianceIdentifier('light').pipe(
      map(devices => {
        return devices
          .map(device => {
            let properties = device.properties;
            if(device.customIdentifiers?.appliance?.includes(',')) {
              const index = device.customIdentifiers?.appliance?.split(',').indexOf('light'); // TODO support more than one light per device
              properties = [device.properties[index]];
            }

            return properties
            .filter(prop => prop.type === 'Relay' || prop.type === 'Dimmer')
            .map(prop => {
              return {
                label: device.customIdentifiers?.label ?? device.displayName,
                state: prop.isOn,
                floor: device.customIdentifiers?.floor ?? '',
                lastUpdated: prop.lastUpdated,
                deviceId: device.id,
                deviceType: device.type,
                propType: prop.type,
                propertyId: prop.id,
                dimmingLevelInPercent: prop.dimmingLevelInPercent,
              } as LightData
            })
              .reduce((prev, cur) => {
                  return {
                    label: prev.label,
                    state: prev.propType === 'Relay' ? prev.state : cur.state,
                    floor: prev.floor,
                    lastUpdated: cur.lastUpdated > prev.lastUpdated ? cur.lastUpdated : prev.lastUpdated,
                    deviceId: prev.deviceId,
                    deviceType: prev.deviceType,
                    propType: cur.propType === 'Dimmer' ? cur.propType : prev.propType,
                    propertyId: prev.propType === 'Relay' ? prev.propertyId : prev.propertyId,
                    dimmingLevelInPercent: cur.propType === 'Dimmer' ? cur.dimmingLevelInPercent : prev.dimmingLevelInPercent,
                  } as LightData
              })
          })
          //.reduce((acc, e) => [...acc, ...e], [])
          .sort((a, b) => {
            var nameA = a.floor.toUpperCase();
            var nameB = b.floor.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
      })
    ).subscribe(lights => this.dataSource.data = lights);
  }

  ngOnInit(): void {
    this.storeService.loadAllDevices();
  }

  switchLight(light: LightData, checked: boolean) {
    this.store.dispatch(SwitchRelay({
      deviceId: light.deviceId,
      deviceType: light.deviceType,
      propertyId: light.propertyId,
      on: checked
    }));
  }

  setDimmingLevel(light: LightData, level: string) {
    const dimmingLevel = parseFloat(level)
    this.store.dispatch(ChangeDimmingLevel({
      deviceId: light.deviceId,
      deviceType: light.deviceType,
      propertyId: light.propertyId,
      dimmingLevel
    }));
  }

  getGrafanaUrl(): string {
    return environment.grafana.urls.lights as string;
  }

}
