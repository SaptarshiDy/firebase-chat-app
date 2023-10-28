import { createSlice, createAsyncThunk, compose } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const retrieveSession = createAsyncThunk('retriveSession', async () => {
    const data = await AsyncStorage.getItem('auth-session');
    return (data) ? JSON.parse(data) : null;
})

export const signIn = createAsyncThunk('singIn', async (data: any) => {

    await messaging().registerDeviceForRemoteMessages();
    const deviceToken = await messaging().getToken();

    const collection = firestore().collection('users');
    const document = collection.doc(data.id);

    document.onSnapshot((snapshot) => {
        if (snapshot.exists) {
            document.update({
                deviceToken: deviceToken,
            });
        } else {
            collection.doc(data.id).set({
                id: data.id,
                name: data.name,
                email: data.email,
                photo: data.photo,
                deviceToken: deviceToken,
            });
        }

        data = snapshot.data();
    })

    try {
        await AsyncStorage.setItem('auth-session', JSON.stringify(data));
    } catch (e) {
        console.error(e)
    }

    return data;
})

export const logout = createAsyncThunk('logout', async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.error(e)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState : {
        user: null,
        isAuthenticated: false,
        isLoading: false,
    },
    reducers: {
        //
    },
    extraReducers: builder => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        })

        builder.addCase(retrieveSession.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(retrieveSession.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isLoading = false;
            } else {
                state.isAuthenticated = false;
                state.isLoading = false;
            }
        })

        builder.addCase(logout.fulfilled, (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
        })
    }
})

export const { } = authSlice.actions
export default authSlice.reducer