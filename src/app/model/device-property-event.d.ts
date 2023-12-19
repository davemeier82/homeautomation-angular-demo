export type DevicePropertyEvent = {
    type: string;
    id: string;
    propertyType: string;
    propertyId: number;
    oldValue?: any;
    newValue?: any;
    eventTime?: Date;
    oldValueTime?: Date;
    label?: string;
}