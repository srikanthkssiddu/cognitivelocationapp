import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction, AsyncThunkOptions } from '@reduxjs/toolkit'

 
type User = {
  id: number
  name: string
}
type InitialState = {
  loading: boolean
  users: User[]
  error: string
}
const initialState: InitialState = {
  loading: false,
  users: [],
  error: ''
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await axios
        .get('https://api.opencagedata.com/geocode/v1/json?key=749b3df9f19745a291f81d48e8093d4b&q=52.3877830%2C9.7334394&pretty=1')
    return response.data
})

setInterval(() => {
    fetchUsers
  }, 10000)
  

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false
        state.users = action.payload
        state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.users = []
        state.error = action.error.message || 'Something went wrong'
      })
  }
})

export default userSlice.reducer