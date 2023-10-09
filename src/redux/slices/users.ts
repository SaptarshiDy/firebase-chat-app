import { createSlice, createAsyncThunk, compose } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import firestore from '@react-native-firebase/firestore';

export const fetchUsers = createAsyncThunk('fetchUsers', async (data: any) => {
    let users: any = [];
    await firestore().collection('users')
    .where('id', '!=', data.ignoredId).get()
    .then(data => {
        data.forEach((value, key) => {
            users.push(data.docs[key].data());
        })
    });
    return users;
})

export const authSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
    },
    reducers: {
        //
    },
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, (state, action: any) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action: any) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchUsers.rejected, (state, action: any) => {
            state.data = [];
            state.isLoading = false;
        });
    }
})

export const { } = authSlice.actions
export default authSlice.reducer

