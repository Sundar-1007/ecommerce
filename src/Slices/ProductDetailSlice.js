import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../API/API";

const initialState = {
    ProductDetailData: null,
    isLoading: false,
    error: null
}

export const getProductDetails = createAsyncThunk(
    '/api/getProductDetails',
    async (id, { rejectWithValue }) => {
        try {
            let res = await axios.get(`${API}/ProductData/${id}`);
            if (res.status === 200) {
                return res.data
            }
        } catch {
            rejectWithValue({ error: "api is not working" })
        }
    }
)

const ProductDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    extraReducers: (builders) => {
        builders
            .addCase(getProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ProductDetailData = action.payload;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.ProductDetailData = null;
                state.error = action.payload.error;
            })
    }
})

export default ProductDetailSlice.reducer;