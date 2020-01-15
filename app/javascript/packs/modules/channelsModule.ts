import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChannelInterface } from '../types/Channel'

export const channelsInitialState: ChannelInterface[] = [];

export const channelsModules = createSlice({
  name: "channels",
  initialState: channelsInitialState,
  reducers: {
    setChannels: (state, action: PayloadAction<ChannelInterface[]>) => action.payload,
  }
});

export const updateChannels = async (dispatch) => {
  const response = await fetch('/api/v1/channels', { credentials: 'same-origin' });
  const channels = await response.json() as Array<ChannelInterface>;
  channels.sort((a, b) => { return Number(a.uptime) - Number(b.uptime) });

  console.log(`channels!!!: ${channels[0].name}`);
  dispatch(channelsModules.actions.setChannels(channels));
};
