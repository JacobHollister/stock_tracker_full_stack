import {createSlice, createAsyncThunk} from '@reduxjs/toolkit' 
import watchlistService from './watchlistService'

const initialState = {
    watchlist: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getWatchList = createAsyncThunk('watchlist/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await watchlistService.getWatchlist(token)
    } catch (error) {
        const message = (error.response && 
                error.response.data && 
                error.response.data.message) 
                || error.message
                || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const addToWatchList = createAsyncThunk('watchlist/add', async (ticker, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await watchlistService.addToWatchlist(ticker, token)
    } catch (error) {
        const message = (error.response && 
                error.response.data && 
                error.response.data.message) 
                || error.message
                || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const removeFromWatchList = createAsyncThunk('watchlist/remove', async (ticker, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await watchlistService.removeFromWatchlist(ticker, token)
    } catch (error) {
        const message = (error.response && 
                error.response.data && 
                error.response.data.message) 
                || error.message
                || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        reset: (state) => initialState
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(getWatchList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWatchList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.watchlist = action.payload
            })
            .addCase(getWatchList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.watchlist = []
            })
            .addCase(addToWatchList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addToWatchList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.watchlist = action.payload
            })
            .addCase(addToWatchList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeFromWatchList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeFromWatchList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.watchlist = action.payload
            })
            .addCase(removeFromWatchList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})

export const  { reset } = watchlistSlice.actions
export default watchlistSlice.reducer