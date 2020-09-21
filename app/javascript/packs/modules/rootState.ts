import { combineReducers } from '@reduxjs/toolkit'
import { channelsModules } from './channelsModule'
import { favoritesModules } from './favoritesModule'
import { peercastModules } from './peercastModule'
import { ChannelInterface } from '../types/Channel'
import { FavoriteInterface } from '../types/Favorite'
import { PeerCastInterface } from '../types/PeerCast'
import { UserInterface } from '../types/User'
import { DialogInterface } from '../types/Dialog'
import { userModules } from './userModule'
import { dialogModules } from './dialogModule'

export interface RootState {
  channels: ChannelInterface[]
  favorites: FavoriteInterface[]
  peercast: PeerCastInterface
  user: UserInterface
  dialog: DialogInterface
}

export const rootReducer = combineReducers({
  channels: channelsModules.reducer,
  favorites: favoritesModules.reducer,
  peercast: peercastModules.reducer,
  user: userModules.reducer,
  dialog: dialogModules.reducer,
})
