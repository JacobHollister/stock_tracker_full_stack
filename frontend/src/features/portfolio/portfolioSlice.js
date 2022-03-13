import {createSlice, createAsyncThunk} from '@reduxjs/toolkit' 
import portfolioService from './portfolioService'

const initialState = {
    trades: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getPortfolio = createAsyncThunk('portfolio/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await portfolioService.getPortfolio(token)
    } catch (error) {
        const message = (error.response && 
                error.response.data && 
                error.response.data.message) 
                || error.message
                || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        reset: (state) => initialState
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(getPortfolio.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPortfolio.fulfilled, (state, action) => {
                state.isLoading = false
                state.trades = action.payload
                state.isSuccess = true
            })
            .addCase(getPortfolio.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.trades = []
            })
    }
})

export const  { reset } = portfolioSlice.actions
export default portfolioSlice.reducer