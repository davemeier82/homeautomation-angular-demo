import { Injectable } from "@angular/core";
import { DeviceService } from "../http/device.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { LoadAllDevicesError, LoadAllDevices, LoadAllDevicesSuccess, SwitchRelay, SwitchRelayError, ChangeRollerState, ChangeRollerStateError, SwitchRelaySuccess, ChangeRollerStateSuccess, ChangeDimmingLevel, ChangeDimmingLevelSuccess, ChangeDimmingLevelError } from "../actions/device.actions";
import { SwitchRelayDto } from "../model/switch-relay-dto";
import { Action } from "@ngrx/store";
import { ChangeRollerStateDto } from "../model/change-roller-state-dto";
import { ChangeDimmingLevelDto } from "../model/change-dimming-level-dto.d copy";

@Injectable()
export class DeviceEffects {

    constructor(
        private actions$: Actions,
        private deviceService: DeviceService
      ) { }

    loadDevices$ = createEffect(() => 
      this.actions$.pipe(
        ofType(LoadAllDevices),
        mergeMap(() => this.deviceService.getAll()
          .pipe(
            map(devices => LoadAllDevicesSuccess({payload: devices})),
            catchError(error => of(LoadAllDevicesError({payload: error})))
          )
        )
      )
    );

    switchRelay$ = createEffect(() => 
      this.actions$.pipe(
        ofType(SwitchRelay),
        mergeMap((data: SwitchRelayDto) => this.deviceService.switchLight(data.deviceId, data.deviceType, data.propertyId, data.on)
          .pipe(
            map(() => SwitchRelaySuccess(data)),
            catchError(error => of(SwitchRelayError({payload: error})))
          )
        )
      )
    );

    changeRollerState$ = createEffect(() => 
      this.actions$.pipe(
        ofType(ChangeRollerState),
        mergeMap((data: ChangeRollerStateDto) => this.deviceService.changeRollerState(data.deviceId, data.deviceType, data.propertyId, data.state, data.position)
          .pipe(
            map(() => ChangeRollerStateSuccess(data)),
            catchError(error => of(ChangeRollerStateError({payload: error})))
          )
        )
      )
    );

    

    changeDimmingLevel$ = createEffect(() => 
      this.actions$.pipe(
        ofType(ChangeDimmingLevel),
        mergeMap((data: ChangeDimmingLevelDto) => this.deviceService.changeDimmingLevel(data.deviceId, data.deviceType, data.propertyId, data.dimmingLevel)
          .pipe(
            map(() => ChangeDimmingLevelSuccess(data)),
            catchError(error => of(ChangeDimmingLevelError({payload: error})))
          )
        )
      )
    );
}
