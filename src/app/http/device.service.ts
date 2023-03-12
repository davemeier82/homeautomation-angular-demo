import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device } from '../model/device'

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private deviceUrl = environment.apiPath + 'v1/devices';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Device[]> {
    return this.http.get<Device[]>(this.deviceUrl);
  }

  switchLight(deviceId: string, type: string, propertyId: number, on: boolean): Observable<any> {
    return this.http.put(this.deviceUrl + '/' + deviceId + '/' + type + '/' + propertyId, {on});
  }

  changeRollerState(deviceId: string, type: string, propertyId: number, state?: string, position?: number): Observable<any> {
    return this.http.put(this.deviceUrl + '/' + deviceId + '/' + type + '/' + propertyId, {state, position});
  }

  changeDimmingLevel(deviceId: string, type: string, propertyId: number, dimmingLevel?: number): Observable<any> {
    return this.http.put(this.deviceUrl + '/' + deviceId + '/' + type + '/' + propertyId, {dimmingLevel});
  }
  
  changeState(deviceId: string, type: string, propertyId: number, state?: string): Observable<any> {
    return this.http.put(this.deviceUrl + '/' + deviceId + '/' + type + '/' + propertyId, {state});
  }
}
