import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ChangeAlarmState } from '../actions/device.actions';
import { DeviceState } from '../app.states';
import { StoreService } from '../store/store.service';

export interface AlarmData {
  deviceId: string;
  deviceType: string;
  propertyId: number;
  label: string;
  floor: string;
  state: string;
  lastUpdated: Date;
}

@Component({
  selector: 'app-lights',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {

  dataSource = new MatTableDataSource<AlarmData>()
  displayedColumns: string[] = ['label', 'floor', 'state', 'actions', 'lastUpdated'];

  constructor(private storeService: StoreService, private store: Store<DeviceState>) {

    storeService.getDevices().pipe(
      map(devices => {
        return devices
          .filter(device => device.properties.findIndex(value => value.type === 'Alarm') != -1)
          .map(device => {
            const alarm = device.properties.find(prop => prop.type === 'Alarm');
            return {
              label: device.customIdentifiers?.label,
              state: alarm?.state,
              floor: device.customIdentifiers?.floor,
              lastUpdated: alarm?.lastUpdated,
              deviceId: device.id,
              deviceType: device.type,
              propertyId: alarm?.id
            } as AlarmData
          })
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
    ).subscribe(alarms => this.dataSource.data = alarms);
  }

  ngOnInit(): void {
    this.storeService.loadAllDevices();
  }

  stop(shutter: AlarmData) {
    this.store.dispatch(ChangeAlarmState({
      deviceId: shutter.deviceId,
      deviceType: shutter.deviceType,
      propertyId: shutter.propertyId,
      state: 'OFF'
    }));
  }

}
