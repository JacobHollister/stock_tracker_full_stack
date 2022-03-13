import {createSlice, createAsyncThunk} from '@reduxjs/toolkit' 
import tradesService from './tradesService'

const initialState = {
    trade: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const addTrade = createAsyncThunk('trades/add', async (tradeDetails, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tradesService.addTrade(tradeDetails, token)
    } catch (error) {
        const message = (error.response && 
                error.response.data && 
                error.response.data.message) 
                || error.message
                || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// export const removeFromWatchList = createAsyncThunk('watchlist/remove', async (ticker, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await watchlistService.removeFromWatchlist(ticker, token)
//     } catch (error) {
//         const message = (error.response && 
//                 error.response.data && 
//                 error.response.data.message) 
//                 || error.message
//                 || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })


export const tradesSlice = createSlice({
    name: 'trades',
    initialState,
    reducers: {
        reset: (state) => initialState
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(addTrade.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addTrade.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.trade = action.payload
            })
            .addCase(addTrade.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const  { reset } = tradesSlice.actions
export default tradesSlice.reducer