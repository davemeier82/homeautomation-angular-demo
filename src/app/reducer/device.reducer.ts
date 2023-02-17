import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { LoadAllDevicesSuccess } from "../actions/device.actions";
import { EventReceived } from "../actions/event.actions";
import { DeviceState } from "../app.states";
import { immerOn } from 'ngrx-immer/store';

export const initialState: DeviceState = { devices: [] };

const _deviceReducer = createReducer(
  initialState,
  on(LoadAllDevicesSuccess, (state, { payload }) => ({ devices: payload })),
  immerOn(EventReceived, (state, { payload }) => {
    const deviceIndex = state.devices.findIndex(device => device.id === payload.id && device.type === payload.type);
    if (deviceIndex) {
      let device = state.devices[deviceIndex];
      if (device) {
        let property = device.properties[payload.propertyId];
        switch (payload.propertyType) {
          case 'RelayStateUpdatedEvent': {
            property.isOn = payload.newValue;
            property.lastUpdated = payload.eventTime;
            break;
          }
          case 'TemperatureUpdatedEvent': {
            property.temperatureInDegree = payload.newValue;
            property.lastUpdated = payload.eventTime;
            break;
          }
          case 'HumidityUpdatedEvent': {
            property.relativeHumidityInPercent = payload.newValue;
            property.lastUpdated = payload.eventTime;
            break;
          }
          case 'DimmingLevelUpdatedEvent': {
            property.dimmingLevelInPercent = payload.newValue;
            property.dimmingLevelLastUpdated = payload.eventTime;
            break;
          }
          case 'IlluminanceUpdatedEvent': {
            property.lux = payload.newValue;
            property.lastUpdated = payload.eventTime;
            break;
          }
          case 'RollerStateChangedEvent': {
            property.state = payload.newValue;
            property.stateLastUpdated = payload.eventTime;
            break;
          }
          case 'RollerPositionChangedEvent': {
            property.positionInPercent = payload.newValue;
            property.lastUpdated = payload.eventTime;
            break;
          }
          case 'WindowStateUpdatedEvent': {
            property.positionInPercent = payload.newValue;
            property.lastUpdated = payload.eventTime;
            break;
          }
          case 'MotionUpdatedEvent': {
            if (payload.newValue) {
              property.lastMotion = payload.eventTime;
            }
            property.lastUpdated = payload.eventTime;
            break;
          }
          case 'Co2LevelUpdatedEvent': {
            property.ppm = payload.newValue;
            property.lastUpdated = payload.eventTime;
            break;
          }
          case 'AlarmStateUpdatedEvent': {
            property.state = payload.newValue;
            property.stateLastUpdated = payload.eventTime;
            break;
          }
          case 'SmokeStateUpdatedEvent': {
            property.isSmokeDetected = payload.newValue;
            property.lastUpdated = payload.eventTime;
            break;
          }
        }
      }
    }
  })
);

export function deviceReducer(state: any, action: Action) {
  return _deviceReducer(state, action);
}

export const getDeviceState = createFeatureSelector<DeviceState>('deviceState');

export const getDevices = createSelector(
  getDeviceState,
  (state: DeviceState) => state.devices
);
