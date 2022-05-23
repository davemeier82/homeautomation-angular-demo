import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable, take } from "rxjs";
import { DeviceState } from "../app.states";
import { Device } from "../model/device";
import * as fromReducer from '../reducer/device.reducer';
import { LoadAllDevices } from '../actions/device.actions';
import { getDevices } from '../reducer/device.reducer';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private store: Store<DeviceState>) {
  }

  loadAllDevices() {
    this.store.select(getDevices).pipe(take(1)).subscribe(devices => {
      if(devices.length === 0) {
        this.store.dispatch(LoadAllDevices());
      }
    })
  }

  getDevicesByApplianceIdentifier(appliance: string): Observable<Device[]> {
    return this.store.select(fromReducer.getDevices)
      .pipe(map(devices => devices.filter(device => this.isNotHidden(device) &&
        device.customIdentifiers?.appliance?.split(',').includes(appliance))));
  }

  getDevicesByOneOfApplianceIdentifiers(appliance1: string, appliance2: string): Observable<Device[]> {
    return this.store.select(fromReducer.getDevices)
      .pipe(map(devices => devices.filter(device => {
        const appliances = device.customIdentifiers?.appliance?.split(',');
        return this.isNotHidden(device) && (appliances?.includes(appliance1) || appliances?.includes(appliance2))
      })));
  }

  private isNotHidden(device: Device) {
    return device.customIdentifiers?.hidden !== 'true';
  }
}