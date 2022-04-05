import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DevicePropertyEvent } from '../model/device-property-event'
import { EventSourcePolyfill } from 'event-source-polyfill';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsUrl = environment.apiPath + 'v1/events';
  private streamEventSource: EventSourcePolyfill | undefined;

  stream(): Observable<DevicePropertyEvent> {
    this.streamEventSource?.close();
    return new Observable<DevicePropertyEvent>(observer => {
      this.streamEventSource =  new EventSourcePolyfill(this.eventsUrl + '/stream', {});
      this.streamEventSource.onmessage = (message) => {
        observer.next(JSON.parse(message.data));
      }
    });
  }

}
