
export type DeviceProperty = {
    id: number;    
    type: string;
    isOn: boolean | undefined | null;
    temperatureInDegree: number | undefined | null;
    relativeHumidityInPercent: number | undefined | null;
    lux: number | undefined | null;
    batteryLevelInPercent: number | undefined | null;
    lastUpdated: Date | undefined | null;
    lastMotion: Date | undefined | null;
    watt: number | undefined | null;
    isOpen: boolean | undefined | null;
    state: string | undefined | null;
    isOpenLastUpdated: Date | undefined | null;
    positionInPercent: number | undefined | null
    stateLastUpdated: Date | undefined | null;
    dimmingLevelInPercent: number | undefined | null;
    dimmingLevelLastUpdated: Date | undefined | null;
    ppm: number | undefined | null;
    isSmokeDetected: boolean | undefined | null;
}