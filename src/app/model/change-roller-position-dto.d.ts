type StoreState = "open" | "close" | "stop";

export type ChangeRollerPositionDto = {
  deviceId: string;
  deviceType: string;
  propertyId: string;
  position?: number;
}
