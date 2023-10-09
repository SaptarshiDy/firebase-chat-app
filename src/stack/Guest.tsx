import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GUEST_ROUTE } from '../utils/route';

const GuestStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={GUEST_ROUTE.Login.name} component={GUEST_ROUTE.Login.screen} />
        </Stack.Navigator>
    );
}

export default GuestStack;