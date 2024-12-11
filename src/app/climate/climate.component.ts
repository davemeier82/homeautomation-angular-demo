import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {map, Observable} from "rxjs";
import {DeviceState} from '../app.states';
import {getDevices} from '../reducer/device.reducer';
import {StoreService} from '../store/store.service';
import {environment} from "../../environments/environment";

export interface SensorData {
  label: string;
  temperature: number;
  humidity: number;
  co2: number
  temperatureLastUpdated: Date;
  humidityLastUpdated: Date;
  co2LastUpdated: Date;
}

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.scss']
})
export class ClimateComponent implements OnInit {

  data$: Observable<SensorData[]>;
  displayedColumns: string[] = ['label', 'temperature', 'humidity', 'co2', 'temperatureLastUpdated', 'humidityLastUpdated', 'co2LastUpdated'];

  constructor(private store: Store<DeviceState>, private storeService: StoreService) {
    this.data$ = store.select(getDevices)
    .pipe(map(devices => devices.filter(device => device.properties.findIndex(value => value.type === 'TemperatureSensor' || value.type === 'HumiditySensor' || value.type === 'Co2Sensor') != -1)
    .map(device => {
      const tempSensor = device.properties.find(prop => prop.type === 'TemperatureSensor');
      const humiditySensor = device.properties.find(prop => prop.type === 'HumiditySensor');
      const co2Sensor = device.properties.find(prop => prop.type === 'Co2Sensor');
      return {
        label: device.displayName,
        temperature: tempSensor?.temperatureInDegree,
        humidity: humiditySensor?.relativeHumidityInPercent,
        co2: co2Sensor?.ppm,
        temperatureLastUpdated: tempSensor?.lastUpdated,
        humidityLastUpdated: humiditySensor?.lastUpdated,
        co2LastUpdated: co2Sensor?.lastUpdated
      } as SensorData
    })
    .filter(d => d.humidity !== null || d.temperature !== null || d.co2 !== null)
    ));
  }

  ngOnInit(): void {
    this.storeService.loadAllDevices();
  }

  getGrafanaUrl(): string {
    return environment.grafana.urls.climate as string;
  }
}
