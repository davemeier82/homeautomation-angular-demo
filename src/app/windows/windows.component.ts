import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {map, Observable, take} from 'rxjs';
import {LoadAllDevices} from '../actions/device.actions';
import {DeviceState} from '../app.states';
import {getDevices} from '../reducer/device.reducer';
import {StoreService} from '../store/store.service';

export interface WindowData {
  label: string;
  floor: string;
  isOpen: boolean;
  lastUpdated: Date;
}

@Component({
  selector: 'app-windows',
  templateUrl: './windows.component.html',
  styleUrls: ['./windows.component.scss']
})
export class WindowsComponent implements OnInit {

  windows$: Observable<WindowData[]>;
  doors$: Observable<WindowData[]>;
  displayedColumns: string[] = ['label', 'floor', 'isOpen', 'lastUpdated'];

  constructor(private storeServie: StoreService, private store: Store<DeviceState>) {
    this.windows$ = this.getByApplianceIdentifier('window');
    this.doors$ = this.getByApplianceIdentifier('door');
  }

  private getByApplianceIdentifier(appliance: string): Observable<WindowData[]> {
    return this.storeServie.getDevicesByApplianceIdentifier(appliance).pipe(
      map(devices => devices.map(device =>
        device.properties
          .filter(prop => prop.type === 'WindowSensor')
          .map(prop => {
            return {
              label: device.customIdentifiers?.label ?? device.displayName,
              floor: device.customIdentifiers?.floor ?? '',
              isOpen: prop.isOpen,
              lastUpdated: prop.isOpenLastUpdated
            } as WindowData
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
          })));
  }

  ngOnInit(): void {
    this.store.select(getDevices).pipe(take(1)).subscribe(devices => {
      if (devices.length === 0) {
        this.store.dispatch(LoadAllDevices());
      }
    })
  }

}
