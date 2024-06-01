import {Injectable} from "@angular/core";
import {DeviceService} from "../http/device.service";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {
  ChangeAlarmState,
  ChangeAlarmStateSuccess,
  ChangeDimmingLevel,
  ChangeDimmingLevelSuccess,
  ChangeRollerPosition,
  ChangeRollerPositionSuccess,
  ChangeRollerState,
  ChangeRollerStateSuccess,
  LoadAllDevices,
  LoadAllDevicesSuccess,
  SwitchRelay,
  SwitchRelaySuccess
} from "../actions/device.actions";
import {SwitchRelayDto} from "../model/switch-relay-dto";
import {ChangeRollerStateDto} from "../model/change-roller-state-dto";
import {ChangeDimmingLevelDto} from "../model/change-dimming-level-dto.d copy";
import {ChangeAlarmStateDto} from "../model/change-alarm-state-dto";
import {ChangeRollerPositionDto} from "../model/change-roller-position-dto";

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
        mergeMap((data: SwitchRelayDto) => this.deviceService.putValueType(data.deviceId, data.deviceType, data.propertyId, 'RelayState', data.on)
          .pipe(
            map(() => SwitchRelaySuccess(data))
          )
        )
      )
    );

  changeRollerState$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ChangeRollerState),
        mergeMap((data: ChangeRollerStateDto) => this.deviceService.putValueType(data.deviceId, data.deviceType, data.propertyId, 'RollerState', data.state)
          .pipe(
            map(() => ChangeRollerStateSuccess(data))
          )
        )
      )
    );

  changeRollerPosition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangeRollerPosition),
      mergeMap((data: ChangeRollerPositionDto) => this.deviceService.putValueType(data.deviceId, data.deviceType, data.propertyId, 'RollerPosition', data.position)
        .pipe(
          map(() => ChangeRollerPositionSuccess(data))
        )
      )
    )
  );

  changeDimmingLevel$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ChangeDimmingLevel),
        mergeMap((data: ChangeDimmingLevelDto) => this.deviceService.putValueType(data.deviceId, data.deviceType, data.propertyId, 'DimmingLevel', data.dimmingLevel)
          .pipe(
            map(() => ChangeDimmingLevelSuccess(data))
          )
        )
      )
    );

  changeAlarmState$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ChangeAlarmState),
        mergeMap((data: ChangeAlarmStateDto) => this.deviceService.putValueType(data.deviceId, data.deviceType, data.propertyId, 'AlarmState', data.state)
          .pipe(
            map(() => ChangeAlarmStateSuccess(data))
          )
        )
      )
    );
}
