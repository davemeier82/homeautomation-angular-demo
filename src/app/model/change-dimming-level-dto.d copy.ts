
export interface ChangeDimmingLevelDto {
    deviceId: string;
    deviceType: string;
    propertyId: number;
    dimmingLevel: number;
}