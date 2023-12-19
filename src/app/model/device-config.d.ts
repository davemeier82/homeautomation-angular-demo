
export type DeviceConfig = {
    type: string;
    id: string;
    displayName: string;
    parameters: Map<string, string>;
    customIdentifiers?: Map<string, string>;
}