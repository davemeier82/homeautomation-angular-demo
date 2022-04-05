import { createAction, props } from "@ngrx/store";
import { ChangeDimmingLevelDto } from "../model/change-dimming-level-dto.d copy";
import { ChangeRollerStateDto } from "../model/change-roller-state-dto";
import { Device } from "../model/device";
import { SwitchRelayDto } from "../model/switch-relay-dto";

export const LoadAllDevices = createAction('[Device] Load Devices');
export const LoadAllDevicesSuccess = createAction('[Device] Devices Loaded Success', props<{ payload: Device[]}>());
export const LoadAllDevicesError = createAction('[Device] Devices Loaded Error', props<{ payload: any}>());
export const SwitchRelay = createAction('[Relay] Switch Relay', props<SwitchRelayDto>());
export const SwitchRelaySuccess = createAction('[Relay] Switch Relay Success', props<SwitchRelayDto>());
export const SwitchRelayError = createAction('[Relay] Devices Loaded Error', props<{ payload: any}>());
export const ChangeRollerState = createAction('[Roller] Change Roller State', props<ChangeRollerStateDto>());
export const ChangeRollerStateSuccess = createAction('[Roller] Change Roller State Success', props<ChangeRollerStateDto>());
export const ChangeRollerStateError = createAction('[Roller] Change Roller State Error', props<{ payload: any}>());
export const ChangeDimmingLevel = createAction('[Dimmer] Change Dimming Level', props<ChangeDimmingLevelDto>());
export const ChangeDimmingLevelSuccess = createAction('[Dimmer] Change Dimming Level Success', props<ChangeDimmingLevelDto>());
export const ChangeDimmingLevelError = createAction('[Dimmer] Change Dimming Level Error', props<{ payload: any}>());