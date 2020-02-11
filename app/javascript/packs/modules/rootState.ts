import { combineReducers } from "@reduxjs/toolkit";
import { channelsModules } from "./channelsModule";
import { ChannelInterface } from '../types/Channel'

export interface RootState {
  channels: ChannelInterface[];
}

export const rootReducer = combineReducers({
  channels: channelsModules.reducer,
});
