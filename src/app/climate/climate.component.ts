import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from "rxjs";
import { DeviceState } from '../app.states';
import { getDevices } from '../reducer/device.reducer';
import { StoreService } from '../store/store.service';

export interface SensorData {
  label: string;
  temperature: number;
  humidity: number;
  temperatureLastUpdated: Date;
  humidityLastUpdated: Date;
}

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.scss']
})
export class ClimateComponent implements OnInit {

  data$: Observable<SensorData[]>;  
  displayedColumns: string[] = ['label', 'temperature', 'humidity', 'temperatureLastUpdated', 'humidityLastUpdated'];

  constructor(private store: Store<DeviceState>, private storeService: StoreService) {    
    this.data$ = store.select(getDevices)
    .pipe(map(devices => devices.filter(device => device.properties.findIndex(value => value.type === 'TemperatureSensor' || value.type === 'HumiditySensor') != -1)
    .map(device => {
      const tempSensor = device.properties.find(prop => prop.type === 'TemperatureSensor');
      const humiditySensor = device.properties.find(prop => prop.type === 'HumiditySensor');
      return {
        label: device.displayName,
        temperature: tempSensor?.temperatureInDegree,
        humidity: humiditySensor?.relativeHumidityInPercent,
        temperatureLastUpdated: tempSensor?.lastUpdated,
        humidityLastUpdated: tempSensor?.lastUpdated
      } as SensorData
    })
    .filter(d => d.humidity !== null || d.temperature !== null)
    ));
  }

  ngOnInit(): void {
    this.storeService.loadAllDevices();
  }

}
