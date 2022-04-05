import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { EventService } from "../http/event.service";
import { EventReceived, StartEventStream } from "../actions/event.actions";
import { Subject } from "rxjs";

@Injectable()
export class EventEffects {

    constructor(
        private actions$: Actions,
        private eventService: EventService
      ) { }

    updateDevice$ = createEffect(() => 
      this.actions$.pipe(
        ofType(StartEventStream),
        mergeMap(() => this.eventService.stream()
          .pipe(
            map(event => EventReceived({payload: event}))
          )
        )
      )
    );

}
