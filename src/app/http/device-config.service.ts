import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadDevicesConfig } from '../actions/device-config.actions';
import { Device } from '../model/device'
import { DevicesConfig } from '../model/devices-config';

@Injectable({
  providedIn: 'root'
})
export class DeviceConfigService {

  private devicesConfigUrl = environment.apiPath + 'v1/devices/config';

  constructor(private http: HttpClient) { }

  getAll(): Observable<DevicesConfig> {
    return this.http.get<DevicesConfig>(this.devicesConfigUrl);
  }

}
