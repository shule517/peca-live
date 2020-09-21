import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Dialog, { DialogInterface } from '../types/Dialog'
import { useSelector } from 'react-redux'
import { RootState } from './rootState'

export const dialogInitialState: DialogInterface = {
  currentAboutPage:
    localStorage.getItem('aboutVersion') === Dialog.CurrentAboutVersion
      ? -1 // 既にAboutページを見ている場合は表示しない
      : 0, // 見たフラグがない時はAboutの1ページ目をセット
}

export const dialogModules = createSlice({
  name: 'dialog',
  initialState: dialogInitialState,
  reducers: {
    openAboutPage: (state, action: PayloadAction<DialogInterface>) =>
      action.payload,
    setAboutPage: (state, action: PayloadAction<DialogInterface>) =>
      action.payload,
  },
})

export const openAboutPage = (dispatch) => {
  dispatch(dialogModules.actions.setAboutPage({ currentAboutPage: 0 })) // 1ページ目を設定
}

export const setAboutPage = (dispatch, openPage) => {
  dispatch(dialogModules.actions.setAboutPage({ currentAboutPage: openPage }))
}

export const useSelectorDialog = () =>
  useSelector((state: RootState) => new Dialog(state.dialog))
