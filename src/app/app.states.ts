import { Device } from './model/device';

export interface AppState {
	deviceState: DeviceState;
}

export interface DeviceState {
	devices: Device[];
	message: any;
}