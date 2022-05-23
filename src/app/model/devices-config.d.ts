import { CustomIdentifiers } from "./custom-identifiers";
import { DeviceConfig } from "./device-config";
import { DeviceProperty } from "./device-property";

export interface DevicesConfig {
    version: string;
    devices: DeviceConfig[];
}