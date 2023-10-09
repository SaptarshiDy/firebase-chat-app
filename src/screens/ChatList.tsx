import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchUsers } from '../redux/slices/users';

const ChatList = ({ navigation }: any) => {

    const auth = useAppSelector(state => state.auth);
    const users = useAppSelector(state => state.users);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers({
            ignoredId: auth.user.id,
        }));
    }, []);

    return (
        <View className='p-4'>
            {
                users.isLoading ?
                    <View className='flex justify-center min-h-screen items-center'>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    :
                    <View>
                        {
                            users.data.length !== 0 ?
                                users.data.map((user: any) =>
                                    <Pressable
                                        key={user.id}
                                        onPress={() => {
                                            navigation.navigate('Chat', { user: user });
                                        }}
                                    >
                                        <View className='flex flex-row items-center p-4 border-2 border-rose-400 rounded mb-4'>
                                            <View
                                                className='rounded-full border-2 border-rose-400 p-1'
                                            >
                                                <Image
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 50,
                                                    }}
                                                    source={{
                                                        uri: user.photo,
                                                    }}
                                                />
                                            </View>

                                            <Text className='text-2xl font-bold ml-4'>
                                                {user.name}
                                            </Text>
                                        </View>
                                    </Pressable>
                                )
                                :
                                <View className='flex justify-center min-h-screen items-center'>
                                    <Text className='text-2xl'>No User Found !</Text>
                                </View>
                        }
                    </View>

            }

        </View>
    );
}

export default ChatList;