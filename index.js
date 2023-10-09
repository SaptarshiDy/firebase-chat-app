import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/redux/store'
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

async function onMessageReceived(message) {
    console.log('KILL MODE NOTIFEE')

    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'message',
        name: 'Message Channel',
        importance: AndroidImportance.HIGH,
        vibration: true,
        sound: 'default',
    });

    // Display a notification
    await notifee.displayNotification({
        title: message.data.title,
        body: message.data.body,
        subtitle: 'Chatify',
        android: {
            channelId,
            largeIcon: message.data.avatar,
            showTimestamp: true,
            importance: AndroidImportance.HIGH,
            sound: 'default',
            pressAction: {
                id: 'chat-open',
                launchActivity: 'default',
            },
            actions: [
                {
                    title: 'Replay',
                    icon: 'https://my-cdn.com/icons/open-chat.png',
                    pressAction: {
                        id: 'message-replay',
                    },
                    input: {
                        placeholder: 'Reply to Sarah...',
                    },
                },
                {
                    title: 'Open',
                    icon: 'https://my-cdn.com/icons/open-chat.png',
                    pressAction: {
                        id: 'chat-open',
                        launchActivity: 'default',
                    },
                },
            ],
        },
    });
}

notifee.onForegroundEvent(({ type, detail }) => {
    const { notification, pressAction } = detail;

    //Message Replay Handle
    if (type === EventType.ACTION_PRESS && pressAction.id == 'message-replay') {
        console.log('User pressed an action with the id: ', pressAction.id);
    }

    //Chap Open Handle
    if (type === EventType.ACTION_PRESS && pressAction.id == 'chat-open') {
        console.log('User pressed an action with the id: ', pressAction.id);
    }

});

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);
messaging().getInitialNotification(onMessageReceived);

const MainApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => MainApp);
