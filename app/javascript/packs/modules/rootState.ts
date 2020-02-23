import { combineReducers } from '@reduxjs/toolkit'
import { channelsModules } from './channelsModule'
import { peercastModules } from './peercastModule'
import { ChannelInterface } from '../types/Channel'
import { PeerCastInterface } from '../types/PeerCast'
import { UserInterface } from '../types/User'
import { userModules } from './userModule'

export interface RootState {
  channels: ChannelInterface[]
  peercast: PeerCastInterface
  user: UserInterface
}

export const rootReducer = combineReducers({
  channels: channelsModules.reducer,
  peercast: peercastModules.reducer,
  user: userModules.reducer
})
