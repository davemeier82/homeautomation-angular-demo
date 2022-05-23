import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadDevicesConfig } from '../actions/device-config.actions';
import { DevicesConfigState } from '../app.states';
import { DevicesConfig } from '../model/devices-config';
import { getDevicesConfig } from '../reducer/device-config.reducer';


@Component({
  selector: 'app-devices-config',
  templateUrl: './devices-config.component.html',
  styleUrls: ['./devices-config.component.scss']
})
export class DevicesConfigComponent implements OnInit {

  devicesConfig$: Observable<DevicesConfig | undefined>;

  constructor(private store: Store<DevicesConfigState>) {
    this.devicesConfig$ = this.store.select(getDevicesConfig);
  }  

  ngOnInit(): void {
    this.store.dispatch(LoadDevicesConfig());
  }


}
