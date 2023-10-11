import React from 'react';
import { Image, View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Profile = () => {
    const auth = useAppSelector(state => state.auth);

    return (
        <View className='p-4'>
            <View className='flex items-center justify-center gap-y-4 shadow-lg bg-blue-200 rounded-t-lg pb-4 mt-4'>
                <View className='rounded-full border-2 border-indigo-600 p-1'>
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                        }}
                        source={{
                            uri: auth.user.photo,
                        }}
                    />
                </View>
                <View className='items-center'>
                    <Text className='text-2xl font-black'>{auth.user.name}</Text>
                    <Text className='text-lg'>{auth.user.email}</Text>
                </View>
            </View>
            <View className='flex gap-y-4 shadow-lg bg-blue-200 rounded-b-lg pb-4 mt-4'>

            </View>
        </View>
    );
}

export default Profile;