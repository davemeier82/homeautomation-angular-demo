
type AlarmState = "OFF" | "PRE_ALARM" | "FIRE" | "BURGLAR";

export type ChangeAlarmStateDto = {
    deviceId: string;
    deviceType: string;
    propertyId: number;
    state?: AlarmState;
}