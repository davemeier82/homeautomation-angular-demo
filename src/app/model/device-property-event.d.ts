export type DevicePropertyEvent = {
  type: string;
  id: string;
  propertyType: string;
  displayName: string;
  propertyId: String;
  oldValue?: any;
  newValue?: any;
  eventTime?: Date;
  oldValueTime?: Date;
}
