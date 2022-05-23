import { Device } from './model/device';
import { DevicesConfig } from './model/devices-config';

export interface AppState {
	deviceState: DeviceState;
	devicesConfigState: DevicesConfigState;
}

export interface DeviceState {
	devices: Device[];
}

export interface DevicesConfigState {
	devicesConfig?: DevicesConfig;
}