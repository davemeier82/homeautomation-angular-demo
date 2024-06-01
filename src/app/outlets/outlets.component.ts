import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '@ngrx/store';
import {map} from 'rxjs';
import {SwitchRelay} from '../actions/device.actions';
import {DeviceState} from '../app.states';
import {StoreService} from '../store/store.service';

export interface OutletData {
  deviceId: string;
  deviceType: string;
  propertyId: string;
  label: string;
  floor: string;
  state: boolean;
  lastUpdated: Date;
}

@Component({
  selector: 'app-outlets',
  templateUrl: './outlets.component.html',
  styleUrls: ['./outlets.component.scss']
})
export class OutletsComponent implements OnInit {

  dataSource = new MatTableDataSource<OutletData>()
  displayedColumns: string[] = ['label', 'floor', 'state', 'lastUpdated'];

  constructor(private storeService: StoreService, private store: Store<DeviceState>) {

    storeService.getDevicesByApplianceIdentifier('outlet').pipe(
      map(devices => {
        return devices
          .map(device => {
            let properties = device.properties;
            if (device.customIdentifiers?.appliance?.includes(',')) {
              const index = device.customIdentifiers?.appliance?.split(',').indexOf('outlet');
              properties = [device.properties[index]];
            }

            return properties
              .filter(prop => prop.type === 'Relay')
              .map(prop => {
                return {
                  label: device.customIdentifiers?.label,
                  state: prop.isOn,
                  floor: device.customIdentifiers?.floor,
                  lastUpdated: prop.lastUpdated,
                  deviceId: device.id,
                  deviceType: device.type,
                  propertyId: prop.id
                } as OutletData
              })
          }
          )
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
    ).subscribe(outlets => this.dataSource.data = outlets);
  }

  ngOnInit(): void {
    this.storeService.loadAllDevices();
  }

  switchRelay(outlet: OutletData, checked: boolean) {
    this.store.dispatch(SwitchRelay({
      deviceId: outlet.deviceId,
      deviceType: outlet.deviceType,
      propertyId: outlet.propertyId,
      on: checked
    }));
  }

}
