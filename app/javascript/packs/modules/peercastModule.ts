import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import PeerCast, { PeerCastInterface } from '../types/PeerCast'
import { useSelector } from 'react-redux'
import { RootState } from './rootState'

export const peercastInitialState: PeerCastInterface = {
  host: 'shule.peca.live',
  portNo: 8144
}

export const peercastModules = createSlice({
  name: 'peercast',
  initialState: peercastInitialState,
  reducers: {
    setPeerCast: (state, action: PayloadAction<PeerCastInterface>) =>
      action.payload
  }
})

// export const updatePeerCast = async (dispatch) => {
//   // const response = await fetch('/api/v1/peercast', { credentials: 'same-origin' });
//   // const peercast = await response.json() as Array<PeerCastInterface>;
//   // peercast.sort((a, b) => { return Number(a.uptime) - Number(b.uptime) });
//
//   dispatch(peercastModules.actions.setPeerCast(peercast));
// };

export const useSelectorPeerCast = () =>
  useSelector((state: RootState) => new PeerCast(state.peercast))
