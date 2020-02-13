import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PeerCast, { PeerCastInterface } from '../types/PeerCast'
import { useSelector } from "react-redux";
import { RootState } from "./rootState";

export const peercastInitialState: PeerCastInterface = { host: PeerCast.defaultHost, portNo: PeerCast.defaultPortNo };

export const peercastModules = createSlice({
  name: "peercast",
  initialState: peercastInitialState,
  reducers: {
    updatePeerCast: (state, action: PayloadAction<PeerCastInterface>) => action.payload,
  }
});

export const updatePeerCast = (dispatch, host, portNo) => {
  dispatch(peercastModules.actions.updatePeerCast({ host: host, portNo: portNo }));
};

export const useSelectorPeerCast = () => useSelector((state: RootState) => new PeerCast(state.peercast));
