import { createAction, props } from "@ngrx/store";
import { DevicePropertyEvent } from "../model/device-property-event";

export const StartEventStream = createAction('[Event] Strat Event Stream');
export const EventReceived = createAction('[Event] Event Received', props<{ payload: DevicePropertyEvent}>());
