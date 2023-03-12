
type AlarmState = "OFF" | "PRE_ALARM" | "FIRE" | "BURGLAR";

export interface ChangeAlarmStateDto {
    deviceId: string;
    deviceType: string;
    propertyId: number;
    state?: AlarmState;
}