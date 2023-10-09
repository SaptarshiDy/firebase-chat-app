import React, { useState, useCallback, useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, MessageContainer, Day } from 'react-native-gifted-chat'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { firebaseServerKey } from '../../app.json';

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
            },
            to: user.deviceToken,
        });
        var config = {
            method: 'post',
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: {
                Authorization:
                    'key='+firebaseServerKey,
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

        />
    );
}

export default Chat;