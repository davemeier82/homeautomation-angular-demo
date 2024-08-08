import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Device} from '../model/device'

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private deviceUrl = environment.apiPath + 'v1/devices';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Device[]> {
    return this.http.get<Device[]>(this.deviceUrl);
  }

  putValueType(deviceId: string, type: string, propertyId: string, valueType: string, value: any): Observable<any> {
    return this.http.put(this.deviceUrl + '/' + type + '-' + deviceId + '/properties/' + propertyId + '/values/' + valueType, {value});
  }
}
