import { createAction, props } from "@ngrx/store";
import { DevicesConfig } from "../model/devices-config";

export const LoadDevicesConfig = createAction('[Device Config] Load Device Config');
export const LoadDevicesConfigSuccess = createAction('[Device Config] Device Config Loaded Success', props<{ payload: DevicesConfig}>());
