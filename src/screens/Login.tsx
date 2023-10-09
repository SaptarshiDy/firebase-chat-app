import React, { useEffect, useState } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { signIn } from '../redux/slices/auth';

import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';


const Login = () => {

    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    const [userInfo, setUserInfo] = useState(null);

    GoogleSignin.configure();

    const signInGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const data = await GoogleSignin.signIn();
            await dispatch(signIn(data.user));
        } catch (error) {
            // console.warn(error);
        }
    };

    const signOutGoogle = async () => {
        try {
            await GoogleSignin.signOut();
            await dispatch(signOut());
        } catch (error) {
            // console.error(error);
        }
    };

    return (
        <View className='flex justify-center items-center h-screen'>
            <Pressable
                onPress={() => {
                    signInGoogle()
                }}
                className='bg-blue-600 p-4 rounded'
            >
                <Text className='text-xl text-white'>
                    Login With Google
                </Text>
            </Pressable>
        </View>
    );
}

export default Login;