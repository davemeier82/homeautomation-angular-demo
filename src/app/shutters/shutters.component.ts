import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { ChangeRollerState, LoadAllDevices } from '../actions/device.actions';
import { DeviceState } from '../app.states';
import { StoreService } from '../store/store.service';

export interface ShutterData {
  deviceId: string;
  deviceType: string;
  propertyId: number;
  label: string;
  state: string;
  position: number;
  lastUpdated: Date;
}

@Component({
  selector: 'app-shutters',
  templateUrl: './shutters.component.html',
  styleUrls: ['./shutters.component.scss']
})
export class ShuttersComponent implements OnInit {

  rollers$: Observable<ShutterData[]>;
  displayedColumns: string[] = ['label', 'state', 'position', 'actions','lastUpdated'];

  constructor(private storeService: StoreService, private store: Store<DeviceState>) { 
    this.rollers$ = storeService.getDevicesByApplianceIdentifier('shutter').pipe(map(devices => devices.map(device => 
      device.properties.filter(prop => prop.type === 'Roller').map(
        prop => {
          return {
            label: device.customIdentifiers?.label,
            state: prop.state,
            position: prop.positionInPercent,
            lastUpdated: prop.stateLastUpdated,
            deviceId: device.id,
            deviceType: device.type,
            propertyId: prop.id
          } as ShutterData      
    })).reduce((acc, e) => [...acc, ...e], [])));
  }

  ngOnInit(): void {
    this.storeService.loadAllDevices();
  }
  
  changeRollerPosition(shutter: ShutterData, position: number) {
    this.store.dispatch(ChangeRollerState({
      deviceId: shutter.deviceId,
      deviceType: shutter.deviceType,
      propertyId: shutter.propertyId,
      position
    }));
  }

  open(shutter: ShutterData) {
    this.store.dispatch(ChangeRollerState({
      deviceId: shutter.deviceId,
      deviceType: shutter.deviceType,
      propertyId: shutter.propertyId,
      state: 'open'
    }));
  }

  stop(shutter: ShutterData) {
    this.store.dispatch(ChangeRollerState({
      deviceId: shutter.deviceId,
      deviceType: shutter.deviceType,
      propertyId: shutter.propertyId,
      state: 'stop'
    }));
  }

  close(shutter: ShutterData) {
    this.store.dispatch(ChangeRollerState({
      deviceId: shutter.deviceId,
      deviceType: shutter.deviceType,
      propertyId: shutter.propertyId,
      state: 'close'
    }));
  }

}
