import { CustomIdentifiers } from "./custom-identifiers";
import { DeviceProperty } from "./device-property";

export interface Device {
    type: string;
    id: string;
    displayName: string;
    properties: DeviceProperty[];
    customIdentifiers?: CustomIdentifiers;
}