import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '@ngrx/store';
import {map, take} from 'rxjs';
import {LoadAllDevices} from '../actions/device.actions';
import {DeviceState} from '../app.states';
import {getDevices} from '../reducer/device.reducer';
import {StoreService} from '../store/store.service';

export interface MotionData {
  label: string;
  floor: string;
  lastMotion: Date;
  lastUpdated: Date;
}

@Component({
  selector: 'app-motion',
  templateUrl: './motion.component.html',
  styleUrls: ['./motion.component.scss']
})
export class MotionComponent  implements OnInit {

  dataSource = new MatTableDataSource<MotionData>()
  displayedColumns: string[] = ['label', 'floor', 'lastMotion', 'lastUpdated'];

  constructor(private storeService: StoreService, private store: Store<DeviceState>) {
    this.storeService.getDevices().pipe(
      map(devices => devices.map(device =>
        device.properties
          .filter(prop => prop.type === 'MotionSensor' && prop.lastUpdated)
          .map(prop => {
            return {
              label: device.customIdentifiers?.label ?? device.displayName,
              floor: device.customIdentifiers?.floor ?? '',
              lastMotion: prop.lastMotion,
              lastUpdated: prop.lastUpdated
            } as MotionData
          })).reduce((acc, e) => [...acc, ...e], [])
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
          })))
          .subscribe(sensors => this.dataSource.data = sensors);
  }

  ngOnInit(): void {
    this.store.select(getDevices).pipe(take(1)).subscribe(devices => {
      if (devices.length === 0) {
        this.store.dispatch(LoadAllDevices());
      }
    })
  }
}
