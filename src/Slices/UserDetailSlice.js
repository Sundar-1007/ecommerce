import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../API/API";

const initialState = {
    data: null,
    isLoading: false,
    err: null,
    userData: null,
    userStatus: null,
    cartProducts: []
};

export const getAllUserData = createAsyncThunk('api/getAllUserData',
    async (_, { rejectWithValue }) => {
        const res = await axios.get(`${API}/userData`);
        if (res.status === 200) {
            return res.data
        } else {
            rejectWithValue({ error: "api is not working" })
        }
    }
)

export const getCartProducts = createAsyncThunk('api/getCartProducts',
    async (_, { rejectWithValue, getState }) => {
        const { userData } = getState().UserDetail;
        try {
            const req = userData.cartProducts.map((id) => axios.get(`${API}/ProductData/${id}`))
            const res = await Promise.all(req)
            return res.map((response) => response.data);

        } catch {
            return rejectWithValue({ err: "error" })
        }
    }
)

const UserDetailSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        logIn: (state, action) => {
            const { userMail, userPassword } = action.payload;
            const user = state.data.find((value) => value.userMail === userMail && value.userPassword === userPassword);
            if (user) {
                state.userData = user;
                state.userStatus = null;
            } else {
                state.userStatus = "Wrong password or email";
                state.userData = null
            }
        },
        logOut: (state) => {
            state.userData = null;
        }
    },
    extraReducers: (builders) => {
        builders
            .addCase(getAllUserData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                console.log(action.payload);
            })
            .addCase(getAllUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.err = action.error;
            })

            .addCase(getCartProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getCartProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartProducts = action.payload;
            })
            .addCase(getCartProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.cartProducts = [];
                state.err = action.payload.error;
            })
    }
})

export const { logIn, logOut } = UserDetailSlice.actions
export default UserDetailSlice.reducer;