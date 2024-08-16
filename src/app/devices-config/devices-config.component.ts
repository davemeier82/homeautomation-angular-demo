import {Component, OnInit} from '@angular/core';
import {map, Observable} from 'rxjs';
import {StoreService} from "../store/store.service";
import {Device} from "../model/device";


@Component({
  selector: 'app-devices-config',
  templateUrl: './devices-config.component.html',
  styleUrls: ['./devices-config.component.scss']
})
export class DevicesConfigComponent implements OnInit {

  devices$: Observable<Device[] | undefined>;

  constructor(private storeService: StoreService) {
    this.devices$ = this.storeService.getDevices().pipe(map(devices => devices.sort((a, b) => a?.displayName.localeCompare(b.displayName))));
  }

  ngOnInit(): void {
    this.storeService.loadAllDevices();
  }

}
