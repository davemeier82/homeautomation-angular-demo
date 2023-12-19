
type StoreState = "open" | "close" | "stop";

export type ChangeRollerStateDto = {
    deviceId: string;
    deviceType: string;
    propertyId: number;
    state?: StoreState;
    position?: number;
}