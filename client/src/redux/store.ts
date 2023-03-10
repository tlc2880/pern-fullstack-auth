import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import todoSlice from './slices/todoSlice'
import shopSlice from './slices/shopSlice'
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const store = configureStore({
    reducer: {
        auth: authSlice,
        todo: todoSlice,
        shop: shopSlice
    }
})