import React, { useState, useCallback, useEffect } from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, MessageContainer, Day, Send } from 'react-native-gifted-chat'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import { FIREBASE_SERVER_KEY } from '../../config';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Chat = ({ route, navigation }: any) => {

    const { user } = route.params;
    const auth = useAppSelector(state => state.auth);

    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetchMessages();
    }, [])

    const fetchMessages = () => {
        const chatId = (auth.user.id > user.id) ?
            '' + auth.user.id + user.id : '' + user.id + auth.user.id;
        const subscriber = firestore().collection('chats')
            .doc(chatId).collection('messages').orderBy('createdAt', 'desc');
        subscriber.onSnapshot(query => {
            const messages = query.docs.map(item => {
                return { ...item._data };
            })
            setMessages(messages);
        });
        return () => subscriber();
    }

    const onSend = useCallback((messages = []) => {
        const message = messages[0];
        const formatedMessage = {
            ...message,
            sendBy: auth.user.id,
            sendTo: user.id,
            createdAt: Date.parse(message.createdAt),
        }

        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, formatedMessage),
        )

        //Store Message Custom Logic
        const chatId = (auth.user.id > user.id) ?
            '' + auth.user.id + user.id : '' + user.id + auth.user.id;
        firestore().collection('chats').doc(chatId)
            .collection('messages').add(formatedMessage);

        sendNotification({
            username: user.name,
            message: message.text,
            image: user.photo,
        }); //Send Notification
    }, [])

    const sendNotification = async (data: any) => {

        var data: any = JSON.stringify({
            data: {
                title: data.username,
                body: data.message,
                avatar: data.image,
                data: auth,
            },
            to: user.deviceToken,
        });
        var config = {
            method: 'post',
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: {
                Authorization:
                    'key=' + FIREBASE_SERVER_KEY,
                'Content-Type': 'application/json',
            },
            data: data,
        };

        await axios(config)
            .then(function (response) {
                // console.warn(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.warn(error);
            });

    }

    return (
        <View className='flex-1'>
            <View className='flex flex-row items-center shadow p-2 gap-x-2 bg-white'>
                <View className='mb-0'>
                    <Pressable
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Icon name="arrow-left" size={30} color="#900" />
                    </Pressable>
                </View>
                <View className='border rounded-full'>
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 50,
                        }}
                        source={{
                            uri: user.photo,
                        }}
                    />
                </View>
                <Text className='text-lg font-medium'>
                    {user.name}
                </Text>
            </View>

            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: auth.user.id,
                    name: auth.user.name,
                    avatar: auth.user.photo,
                }}
                isLoadingEarlier={true}

                renderChatEmpty={() => {
                    return (
                        <View className='flex justify-center item-center h-screen'>
                            <Text className='text-center rotate-180'>
                                No Message Found !
                            </Text>
                        </View>
                    );
                }}

                renderAvatarOnTop={true}

                renderBubble={(props) => {
                    return (
                        <Bubble
                            {...props}
                            wrapperStyle={{
                                left: {
                                    backgroundColor: 'white',
                                },
                            }}
                        />
                    );
                }}
                renderInputToolbar={(props) => {
                    return (
                        <InputToolbar
                            {...props}
                            containerStyle={{
                                backgroundColor: 'white',
                            }}
                        />
                    );
                }}

                // alwaysShowSend={true}
                renderSend={(props) => {
                    return (
                        <View className='flex flex-row aling-center justify-center p-1'>
                            {/* <View className='bg-green-600 rounded-full p-2'>
                                <MaterialCommunityIcon name="camera-image" size={25} color="#fff" />
                            </View> */}
                            <Send {...props} containerStyle={{justifyContent: 'center'}}>
                                <View className=' rounded-full'>
                                    <MaterialCommunityIcon 
                                        name="send-circle" size={45} color="#1fa33c"
                                    />
                                </View>
                            </Send>
                        </View>
                    );
                }}
            />
        </View>
    );
}

export default Chat;