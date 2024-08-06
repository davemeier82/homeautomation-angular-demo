import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {from, Observable, pairwise, toArray} from 'rxjs';
import {map} from 'rxjs/operators';
import {ChangeRollerPosition, ChangeRollerState} from '../actions/device.actions';
import {DeviceState} from '../app.states';
import {StoreService} from '../store/store.service';
import {Device} from "../model/device";

export interface ShutterData {
  deviceId: string;
  deviceType: string;
  propertyId: string;
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
  displayedColumns: string[] = ['label', 'state', 'position', 'actions', 'lastUpdated'];

  constructor(private storeService: StoreService, private store: Store<DeviceState>) {
    this.rollers$ = this.storeService.getDevicesByApplianceIdentifier('shutter')
      .pipe(
        map(devices => devices
          .map(device => this.getShutterDataObservable(device))),
        map(shutterDataArrays => shutterDataArrays.flat())
      )
  }

  private getShutterDataObservable(device: Device): ShutterData[] {
    let result: ShutterData[] = [];
    from(device.properties.filter(prop => prop.type === 'Roller'))
      .pipe(
        map(prop => ({
          label: device.customIdentifiers?.label,
          state: prop.state,
          position: prop.positionInPercent,
          lastUpdated: prop.stateLastUpdated,
          deviceId: device.id,
          deviceType: device.type,
          propertyId: prop.id
        } as ShutterData)),
        pairwise(),
        map(([prev, curr]) => ({
          label: prev.label,
          state: prev.state ?? curr.state,
          position: curr.position ?? prev.position,
          lastUpdated: curr.lastUpdated ?? prev.lastUpdated,
          deviceId: prev.deviceId,
          deviceType: prev.deviceType,
          propertyId: prev.propertyId
        } as ShutterData)),
        toArray()
      )
      .subscribe(data => result = data);

    return result;
  }

  ngOnInit(): void {
    this.storeService.loadAllDevices();
  }

  changeRollerPosition(shutter: ShutterData, pos: string) {
    const position = parseFloat(pos);
    this.store.dispatch(ChangeRollerPosition({
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
