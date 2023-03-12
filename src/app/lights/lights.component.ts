import { Component, OnInit } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ChangeDimmingLevel, LoadAllDevices, SwitchRelay } from '../actions/device.actions';
import { DeviceState } from '../app.states';
import { StoreService } from '../store/store.service';

export interface LightData {
  deviceId: string;
  deviceType: string;
  propertyId: number;
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
              const index = device.customIdentifiers?.appliance?.split(',').indexOf('light');
              properties = [device.properties[index]];
            }

            return properties
            .filter(prop => prop.type === 'Relay' || prop.type === 'Dimmer')
            .map(prop => {
              return {
                label: device.customIdentifiers?.label,
                state: prop.isOn,
                floor: device.customIdentifiers?.floor,
                lastUpdated: prop.lastUpdated,
                deviceId: device.id,
                deviceType: device.type,
                propertyId: prop.id,
                dimmingLevelInPercent: prop.dimmingLevelInPercent,
                dimmingLevelLastUpdated: prop.dimmingLevelLastUpdated
              } as LightData
            })
          })
          .reduce((acc, e) => [...acc, ...e], [])
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

}
