import { Injectable } from "@angular/core";
import { DeviceService } from "../http/device.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { LoadAllDevices, LoadAllDevicesSuccess, SwitchRelay, ChangeRollerState, SwitchRelaySuccess, ChangeRollerStateSuccess, ChangeDimmingLevel, ChangeDimmingLevelSuccess, ChangeAlarmState, ChangeAlarmStateSuccess } from "../actions/device.actions";
import { SwitchRelayDto } from "../model/switch-relay-dto";
import { ChangeRollerStateDto } from "../model/change-roller-state-dto";
import { ChangeDimmingLevelDto } from "../model/change-dimming-level-dto.d copy";
import { ChangeAlarmStateDto } from "../model/change-alarm-state-dto";

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
            map(devices => LoadAllDevicesSuccess({payload: devices}))
          )
        )
      )
    );

    switchRelay$ = createEffect(() => 
      this.actions$.pipe(
        ofType(SwitchRelay),
        mergeMap((data: SwitchRelayDto) => this.deviceService.switchLight(data.deviceId, data.deviceType, data.propertyId, data.on)
          .pipe(
            map(() => SwitchRelaySuccess(data))
          )
        )
      )
    );

    changeRollerState$ = createEffect(() => 
      this.actions$.pipe(
        ofType(ChangeRollerState),
        mergeMap((data: ChangeRollerStateDto) => this.deviceService.changeRollerState(data.deviceId, data.deviceType, data.propertyId, data.state, data.position)
          .pipe(
            map(() => ChangeRollerStateSuccess(data))
          )
        )
      )
    );
    
    changeDimmingLevel$ = createEffect(() => 
      this.actions$.pipe(
        ofType(ChangeDimmingLevel),
        mergeMap((data: ChangeDimmingLevelDto) => this.deviceService.changeDimmingLevel(data.deviceId, data.deviceType, data.propertyId, data.dimmingLevel)
          .pipe(
            map(() => ChangeDimmingLevelSuccess(data))
          )
        )
      )
    );
   
    changeAlarmState$ = createEffect(() => 
      this.actions$.pipe(
        ofType(ChangeAlarmState),
        mergeMap((data: ChangeAlarmStateDto) => this.deviceService.changeState(data.deviceId, data.deviceType, data.propertyId, data.state)
          .pipe(
            map(() => ChangeAlarmStateSuccess(data))
          )
        )
      )
    );
}
