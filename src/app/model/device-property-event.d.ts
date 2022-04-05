export interface DevicePropertyEvent {
    type: string;
    id: string;
    propertyType: string;
    propertyId: number;
    oldValue?: any;
    newValue?: any;
    eventTime?: Date;
    oldValueTime?: Date;
}