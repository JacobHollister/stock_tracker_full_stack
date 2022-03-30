import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";
import tradesReducer from "../features/trades/tradesSlice";
import cryptoTradesSlice from "../features/cryptoTrades/cyrptoTradesSlice";
import portfolioReducer from "../features/portfolio/portfolioSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        watchlist: watchlistReducer,
        trades: tradesReducer,
        cryptoTrades: cryptoTradesSlice,
        portfolio: portfolioReducer
    }
})