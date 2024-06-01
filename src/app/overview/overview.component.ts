import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {map, Observable} from 'rxjs';
import {DeviceState} from '../app.states';
import {StoreService} from '../store/store.service';
import {SwitchRelay} from '../actions/device.actions';

export interface LightData {
  deviceId: string;
  deviceType: string;
  propertyId: string;
  label: string;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  lights$: Observable<LightData[]>;
  rollers$: Observable<string[]>;
  windows$: Observable<string[]>;

  constructor(private storeService: StoreService, private store: Store<DeviceState>) {

    this.lights$ = storeService.getDevicesByApplianceIdentifier('light').pipe(
      map(devices => devices.map(device => {
        let properties = device.properties;
        if (device.customIdentifiers?.appliance?.includes(',')) {
          const index = device.customIdentifiers?.appliance?.split(',').indexOf('light');
          properties = [device.properties[index]];
        }

        return properties
          .filter(prop => prop.type === 'Relay' || prop.type === 'Dimmer')
          .filter(prop => prop?.isOn)
          .map(prop => {
              return {
                deviceId: device.id,
                deviceType: device.type,
                propertyId: prop.id,
                label: device.displayName
              }
          })
      })
        .reduce((acc, e) => [...acc, ...e], [])
      ));

    this.rollers$ = storeService.getDevicesByApplianceIdentifier('shutter').pipe(
      map(devices => devices.map(device =>
        device.properties
          .filter(prop => prop.type === 'Roller')
          .filter(prop => prop?.positionInPercent !== 100)
          .map(() => device.displayName)
      )
        .reduce((acc, e) => [...acc, ...e], [])
        ));

    this.windows$ = storeService.getDevicesByOneOfApplianceIdentifiers('window', 'door').pipe(
      map(devices => devices.map(device =>
        device.properties
          .filter(prop => prop.type === 'WindowSensor')
          .filter(prop => prop?.isOpen)
          .map(() => device.displayName)
      )
        .reduce((acc, e) => [...acc, ...e], [])));
  };

  swithLightOff(light: LightData) {
    this.store.dispatch(SwitchRelay({
      deviceId: light.deviceId,
      deviceType: light.deviceType,
      propertyId: light.propertyId,
      on: false
    }));
  }

  ngOnInit(): void {
    this.storeService.loadAllDevices();
  }

}
