import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IAuthSliceInitialState {
  isAuthorized: boolean
  isAuthenticating: boolean
}

const initialState: IAuthSliceInitialState = {
  isAuthorized: false,
  isAuthenticating: true
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    updateAuthSlice: (
      state,
      action: PayloadAction<{
        isAuthorized: boolean
        isAuthenticating: boolean
      }>
    ) => {
      const { isAuthenticating, isAuthorized } = action.payload

      return {
        ...state,
        isAuthorized,
        isAuthenticating
      }
    }
  }
})

export const { updateAuthSlice } = authSlice.actions

export default authSlice.reducer
