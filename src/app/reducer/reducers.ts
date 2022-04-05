import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "../app.states";
import * as fromReducer from './device.reducer';

export const reducers: ActionReducerMap<AppState> = {
    deviceState: fromReducer.deviceReducer
  };