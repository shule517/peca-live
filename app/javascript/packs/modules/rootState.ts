import { combineReducers } from '@reduxjs/toolkit'
import { channelsModules } from './channelsModule'
import { peercastModules } from './peercastModule'
import { ChannelInterface } from '../types/Channel'
import { PeerCastInterface } from '../types/PeerCast'

export interface RootState {
  channels: ChannelInterface[]
  peercast: PeerCastInterface
}

export const rootReducer = combineReducers({
  channels: channelsModules.reducer,
  peercast: peercastModules.reducer
})
