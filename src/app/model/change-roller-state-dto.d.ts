
type StoreState = "open" | "close" | "stop";

export type ChangeRollerStateDto = {
    deviceId: string;
    deviceType: string;
  propertyId: string;
    state?: StoreState;
}
