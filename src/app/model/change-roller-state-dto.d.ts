
type StoreState = "open" | "close" | "stop";

export interface ChangeRollerStateDto {
    deviceId: string;
    deviceType: string;
    propertyId: number;
    state?: StoreState;
    position?: number;
}