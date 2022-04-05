import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { ChangeRollerState, LoadAllDevices } from '../actions/device.actions';
import { StartEventStream } from '../actions/event.actions';
import { DeviceState } from '../app.states';
import { getDevices } from '../reducer/device.reducer';
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

  constructor(private storeServie: StoreService, private store: Store<DeviceState>) {

    this.lights$ = storeServie.getDevicesByApplianceIdentifier('light').pipe(
      map(devices => devices.map(device => device.properties
        .filter(prop => prop.type === 'Relay' || prop.type === 'Dimmer')
        .map(prop => {
          if (prop?.isOn) {
            return device.displayName;
          } else {
            return null;
          }
        })
      )
        .reduce((acc, e) => [...acc, ...e], [])
        .filter(s => s !== null)));

    this.rollers$ = storeServie.getDevicesByApplianceIdentifier('shutter').pipe(
      map(devices => devices.map(device =>
        device.properties
          .filter(prop => prop.type === 'Roller')
          .map(prop => {
            if (prop?.positionInPercent && prop?.positionInPercent !== 100) {
              return device.displayName;
            } else {
              return null;
            }
          })
      )
        .reduce((acc, e) => [...acc, ...e], [])
        .filter(s => s !== null)));

    this.windows$ = storeServie.getDevicesByOneOfApplianceIdentifiers('window', 'door').pipe(
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
    this.store.select(getDevices).pipe(take(1)).subscribe(devices => {
      if (devices.length === 0) {
        this.store.dispatch(LoadAllDevices());
      }
    });
  }

}
