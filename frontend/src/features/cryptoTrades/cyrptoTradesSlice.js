import {createSlice, createAsyncThunk} from '@reduxjs/toolkit' 
import cryptoTradesService from './cryptoTradesService'

const initialState = {
    trade: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    modalOpen: false,
    modalType: '',
}

export const addTrade = createAsyncThunk('cryptoTrades/add', async (tradeDetails, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cryptoTradesService.addTrade(tradeDetails, token)
    } catch (error) {
        const message = (error.response && 
                error.response.data && 
                error.response.data.message) 
                || error.message
                || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteTrade = createAsyncThunk('cryptoTrades/delete', async (trade_id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cryptoTradesService.deleteTrade(trade_id, token)
    } catch (error) {
        const message = (error.response && 
                error.response.data && 
                error.response.data.message) 
                || error.message
                || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateTrade = createAsyncThunk('cryptoTrades/update', async (tradeDetails, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await cryptoTradesService.updateTrade(tradeDetails, token)
    } catch (error) {
        const message = (error.response && 
                error.response.data && 
                error.response.data.message) 
                || error.message
                || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const cryptoTradesSlice = createSlice({
    name: 'cryptoTrades',
    initialState,
    reducers: {
        reset: (state) => initialState,
        confirm_delete: (state, action) => {
            state.trade = action.payload
            state.modalType = 'delete'
            state.modalOpen = true
        },
        confirm_add: (state, action) => {
            state.trade = action.payload
            state.modalType = 'add'
            state.modalOpen = true
        },
        confirm_update: (state, action) => {
            state.trade = action.payload
            state.modalType = 'update'
            state.modalOpen = true
        },
        cancel_confirm: (state) => {
            state.modalType = ''
            state.modalOpen = false
            state.trade = null
        }
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
            .addCase(deleteTrade.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTrade.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(deleteTrade.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateTrade.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTrade.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(updateTrade.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const  { reset, confirm_delete, cancel_confirm, confirm_add, confirm_update } = cryptoTradesSlice.actions
export default cryptoTradesSlice.reducer