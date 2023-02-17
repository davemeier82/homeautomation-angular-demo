
export interface DeviceProperty {
    id: number;    
    type: string;
    isOn?: boolean;
    temperatureInDegree?: number;
    relativeHumidityInPercent?: number;
    lux?: number;
    batteryLevelInPercent?: number;
    lastUpdated?: Date;
    lastMotion?: Date;
    watt?: number;
    isOpen?: boolean;
    state?: string;
    isOpenLastUpdated?: Date;
    positionInPercent?: number
    stateLastUpdated?: Date;
    dimmingLevelInPercent?: number;
    dimmingLevelLastUpdated?: Date;
    ppm?: number;
    isSmokeDetected?: boolean;
}