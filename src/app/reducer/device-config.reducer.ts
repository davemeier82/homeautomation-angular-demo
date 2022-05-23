import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { DevicesConfigState } from "../app.states";
import { LoadDevicesConfigSuccess } from "../actions/device-config.actions";

export const initialState: DevicesConfigState = {devicesConfig: {devices: [], version: ""}};

const _devicesConfigReducer = createReducer(
    initialState,
    on(LoadDevicesConfigSuccess, (state, {payload}) => ({devicesConfig: payload}))
  );

  export function devicesConfigReducer(state: any, action: Action) {
    return _devicesConfigReducer(state, action);
  }

export const getDeviceState = createFeatureSelector<DevicesConfigState>('devicesConfigState');

export const getDevicesConfig = createSelector(
    getDeviceState, 
    (state: DevicesConfigState) => state.devicesConfig 
);
