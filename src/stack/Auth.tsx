import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_ROUTE } from '../utils/route';

const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right', 
            }}
        >
            <Stack.Screen 
                name={AUTH_ROUTE.ChatList.name}
                component={AUTH_ROUTE.ChatList.screen}
            />
            <Stack.Screen 
                name={AUTH_ROUTE.Chat.name}
                component={AUTH_ROUTE.Chat.screen}
            />
        </Stack.Navigator>
    );
}

export default AuthStack;