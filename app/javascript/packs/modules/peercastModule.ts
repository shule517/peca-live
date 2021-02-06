import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import PeerCast, { PeerCastInterface } from '../types/PeerCast'
import { useSelector } from 'react-redux'
import { RootState } from './rootState'

export const peercastInitialState: PeerCastInterface = {
  host: null,
  portNo: null,
}

export const peercastModules = createSlice({
  name: 'peercast',
  initialState: peercastInitialState,
  reducers: {
    initPeerCast: (state, action: PayloadAction<PeerCastInterface>) =>
      action.payload,
    updatePeerCast: (state, action: PayloadAction<PeerCastInterface>) =>
      action.payload,
  },
})

export const initPeerCast = async (dispatch) => {
  // 初期値はクッキーから復帰
  const settingsPecaHost = localStorage.getItem('pecaHost')
  const settingsPecaPortNo = localStorage.getItem('pecaPortNo')

  if (settingsPecaHost && settingsPecaPortNo) {
    updatePeerCast(dispatch, settingsPecaHost, settingsPecaPortNo)
  } else {
    const response = await fetch('/api/v1/peercast', {
      credentials: 'same-origin',
    })
    const peercast = (await response.json()) as PeerCastInterface
    updatePeerCast(dispatch, peercast.host, peercast.portNo)
  }
}

export const updatePeerCast = (dispatch, host, portNo) => {
  dispatch(
    peercastModules.actions.updatePeerCast({ host: host, portNo: portNo })
  )
}

export const useSelectorPeerCast = () =>
  useSelector((state: RootState) => new PeerCast(state.peercast))
