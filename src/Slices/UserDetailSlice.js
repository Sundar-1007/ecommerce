import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../API/API";

const initialState = {
    data: null,
    isLoading: false,
    err: "",
    loggedUser: null
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

const UserDetailSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        logIn: (state, action) => {
            const { userMail, userPassword } = action.payload;
            state.loggedUser = state.data.find((value) => value.userMail === userMail && value.userPassword === userPassword);
        },
        logOut: (state) => {
            state.loggedUser = null;
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
    }
})

export const { logIn, logOut } = UserDetailSlice.actions
export default UserDetailSlice.reducer;