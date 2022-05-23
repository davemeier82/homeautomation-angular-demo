import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../app.states";
import { devicesConfigReducer } from "./device-config.reducer";
import { deviceReducer } from "./device.reducer";

export const reducers: ActionReducerMap<AppState> = {
    deviceState: deviceReducer,
    devicesConfigState: devicesConfigReducer
  };