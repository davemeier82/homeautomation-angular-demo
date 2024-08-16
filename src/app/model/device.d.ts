import {CustomIdentifiers} from "./custom-identifiers";
import {DeviceProperty} from "./device-property";

export type Device = {
  type: string;
  id: string;
  displayName: string;
  properties: DeviceProperty[];
  customIdentifiers?: CustomIdentifiers;
  parameters?: Map<String, String>;
}
