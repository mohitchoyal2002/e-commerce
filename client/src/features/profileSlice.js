import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: false
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action)=>{
      state.profile = action.payload
    }
  }
});

export const {setProfile} = profileSlice.actions

export const profile = state=>state.profile

export default profileSlice.reducer