import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import User, { UserInterface } from '../types/User'
import { useSelector } from 'react-redux'
import { RootState } from './rootState'

export const userInitialState: UserInterface = {
  uid: null,
  displayName: null,
  photoURL: null
}

export const userModules = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserInterface>) => action.payload,
    signOutUser: (state, action: PayloadAction<UserInterface>) => action.payload
  }
})

export const updateUser = (dispatch, uid, displayName, photoURL) => {
  dispatch(
    userModules.actions.updateUser({
      uid: uid,
      displayName: displayName,
      photoURL: photoURL
    })
  )
}

export const signOutUser = dispatch => {
  dispatch(
    userModules.actions.signOutUser({
      uid: null,
      displayName: null,
      photoURL: null
    })
  )
}

export const useSelectorUser = () =>
  useSelector((state: RootState) => new User(state.user))
