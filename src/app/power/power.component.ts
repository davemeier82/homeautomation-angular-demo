import {Component} from '@angular/core';
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.scss']
})
export class PowerComponent  {

  getGrafanaUrl(): string {
    return environment.grafana.urls.power as string;
  }

}
