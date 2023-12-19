import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { EventReceived, StartEventStream } from "../actions/event.actions";
import { EventMqttService } from "../mqtt/event-mqtt-service";
import { DevicePropertyEvent } from "../model/device-property-event";

@Injectable()
export class EventEffects {

    constructor(
        private actions$: Actions,
        private eventService: EventMqttService
      ) { }

    updateDevice$ = createEffect(() => 
      this.actions$.pipe(
        ofType(StartEventStream),
        mergeMap(() => this.eventService.topic('homeautomation/event')
          .pipe(
            map(message => JSON.parse(message.payload.toString()) as DevicePropertyEvent),
            map(event => EventReceived({payload: event}))
          )
        )
      )
    );

}
