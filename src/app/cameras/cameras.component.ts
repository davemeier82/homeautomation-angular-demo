import {Component} from '@angular/core';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent {

 public getCameraUrl(): string {
   return environment.cameraUrl as string;
  }
}
