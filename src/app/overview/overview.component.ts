import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { DeviceState } from '../app.states';
import { StoreService } from '../store/store.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  lights$: Observable<(string | null)[]>;
  rollers$: Observable<(string | null)[]>;
  windows$: Observable<(string | null)[]>;

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
          .map(prop => {
            if (prop?.isOn) {
              return device.displayName;
            } else {
              return null;
            }
          })
      })
        .reduce((acc, e) => [...acc, ...e], [])
        .filter(s => s !== null)
      ));

    this.rollers$ = storeService.getDevicesByApplianceIdentifier('shutter').pipe(
      map(devices => devices.map(device =>
        device.properties
          .filter(prop => prop.type === 'Roller')
          .map(prop => {
            if (prop?.positionInPercent !== 100) {
              return device.displayName;
            } else {
              return null;
            }
          })
      )
        .reduce((acc, e) => [...acc, ...e], [])
        .filter(s => s !== null)));

    this.windows$ = storeService.getDevicesByOneOfApplianceIdentifiers('window', 'door').pipe(
      map(devices => devices.map(device =>
        device.properties
          .filter(prop => prop.type === 'WindowSensor')
          .map(prop => {
            if (prop?.isOpen) {
              return device.displayName;
            } else {
              return null;
            }
          })
      )
        .reduce((acc, e) => [...acc, ...e], [])
        .filter(s => s !== null)));
  };

  ngOnInit(): void {
    this.storeService.loadAllDevices();
  }

}
