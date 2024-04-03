import React from 'react'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { signup, signin } from "../Services/Authservice";
import Swal from 'sweetalert2';
import WithReactContent from "sweetalert2-react-content";
import { SatelliteTwoTone } from '@material-ui/icons';
const MySwal = WithReactContent(Swal);

export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        // const {formData} = user
        // console.log(formData)
        try {
            let res;
            try {
                res = await signup(user);
            } catch {
                return rejectWithValue("Something went wrong.");
            }
            if (!res.data.success) throw res.data.message;
            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const login = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        // const {formData} = user
        // console.log(formData)
        try {
            let res;
            try {
                res = await signin(user);
            } catch {
                return rejectWithValue("Something went wrong.");
            }
            if (!res.data.success) throw res.data.message;
            return res.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const logout = createAsyncThunk("auth/logout", () => {
    localStorage.removeItem("CC_Token");
    localStorage.removeItem("refresh_token");
});


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: new String(),
        isLoggedIn: false,
    },
    reducers: {
        // Reducer comes here
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.errorMessage = new String()
            state.isLoggedIn = false
        }
    },
    extraReducers: (builder) => {
        //get articles
        builder
            //insertion user
            .addCase(register.pending, (state, action) => {
                state.isSuccess = false;
                state.isError = false;
                state.errorMessage = new String();
                state.isLoading = true;
                state.status = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.status = 200;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.errorMessage = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state, action) => {
                state.isSuccess = false;
                state.isError = false;
                state.errorMessage = new String();
                state.isLoading = true;
                state.status = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
                localStorage.setItem("CC_Token", action.payload.token)
                //refreshToken
                localStorage.setItem('refresh_token', action.payload.refreshToken);
                MySwal.fire({
                    //  icon: 'success',
                    title: 'Connection was successful',
                })
                // localStorage.setItem("CC_User",action.payload.user)
                state.isSuccess = true;

            })
            .addCase(login.rejected, (state, action) => {
                console.log(action.payload);
                state.isLoggedIn = false;
                state.user = null;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
    }
}
)




export const { reset } = authSlice.actions
export default authSlice.reducer;

