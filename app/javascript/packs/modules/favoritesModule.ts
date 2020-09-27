import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Favorite, { FavoriteInterface } from '../types/Favorite'
import { useSelector } from 'react-redux'
import { RootState } from './rootState'

export const favoritesInitialState: FavoriteInterface[] = []

export const favoritesModules = createSlice({
  name: 'favorites',
  initialState: favoritesInitialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<FavoriteInterface[]>) => action.payload,
  },
})

export const updateFavorites = async (dispatch) => {
  const response = await fetch('/api/v1/favorites', {
    credentials: 'same-origin',
  })
  const favorites = (await response.json()) as Array<FavoriteInterface>
  dispatch(favoritesModules.actions.setFavorites(favorites))
}

export const useSelectorFavorites = () =>
  useSelector((state: RootState) => state.favorites.map((channel) => new Favorite(channel)))
