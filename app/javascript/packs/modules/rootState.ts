import { combineReducers } from "@reduxjs/toolkit";
import { channelsModules } from "./channelsModule";
import Channel from '../types/Channel'

export interface RootState {
  channels: Channel[];
}

export const rootReducer = combineReducers({
  channels: channelsModules.reducer,
});
