import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../API/API";

const initialState = {
    data: null,
    isLoading: false,
    err: "",
};


export const getProducts = createAsyncThunk(
    '/api/products',
    async (_, { rejectWithValue }) => {
        try {
            let res = await axios.get(`${API}/ProductData`);
            if (res.status === 200) {
                return res.data;
            } else {
                rejectWithValue({ error: res.statusText})
            }

        } catch {
            rejectWithValue({ error: "Not Working" })
        }
    }
)

const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProducts: (state, action) => {
            return state = action.payload;
        },
        removeProducts: () => {
            return null;
        }
    }, extraReducers: (builders) => {
        builders
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.err = action.payload.error
            })
    }
})

export const { addProducts, removeProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
