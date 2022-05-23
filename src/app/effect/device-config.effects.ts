import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { LoadDevicesConfig, LoadDevicesConfigSuccess } from "../actions/device-config.actions";
import { DeviceConfigService } from "../http/device-config.service";

@Injectable()
export class DevicesConfigEffects {

    constructor(
        private actions$: Actions,
        private deviceConfigService: DeviceConfigService
      ) { }

    loadDevicesConfig$ = createEffect(() => 
      this.actions$.pipe(
        ofType(LoadDevicesConfig),
        mergeMap(() => this.deviceConfigService.getAll()
          .pipe(
            map(devicesConfig => LoadDevicesConfigSuccess({payload: devicesConfig}))
          )
        )
      )
    );

}
