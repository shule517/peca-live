import { combineReducers } from '@reduxjs/toolkit'
import { channelsModules } from './channelsModule'
import { favoritesModules } from './favoritesModule'
import { peercastModules } from './peercastModule'
import { ChannelInterface } from '../types/Channel'
import { FavoriteInterface } from '../types/Favorite'
import { PeerCastInterface } from '../types/PeerCast'
import { UserInterface } from '../types/User'
import { userModules } from './userModule'

export interface RootState {
  channels: ChannelInterface[]
  favorites: FavoriteInterface[]
  peercast: PeerCastInterface
  user: UserInterface
}

export const rootReducer = combineReducers({
  channels: channelsModules.reducer,
  favorites: favoritesModules.reducer,
  peercast: peercastModules.reducer,
  user: userModules.reducer
})
