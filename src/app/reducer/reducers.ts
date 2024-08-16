import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "../app.states";
import {deviceReducer} from "./device.reducer";

export const reducers: ActionReducerMap<AppState> = {
    deviceState: deviceReducer,
  };
