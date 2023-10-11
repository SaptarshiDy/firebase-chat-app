import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AUTH_ROUTE } from '../utils/route';

const Tab = createMaterialTopTabNavigator();
const Profile = ({ navigation }: any) => {
    return (
        <View className='flex-1'>
            {/* <View>
                <Text>This is additional content at the top</Text>
            </View> */}
            <Tab.Navigator>
                <Tab.Screen 
                    name={AUTH_ROUTE.ChatList.name}
                    component={AUTH_ROUTE.ChatList.screen}
                />
                <Tab.Screen 
                    name={AUTH_ROUTE.Profile.name}
                    component={AUTH_ROUTE.Profile.screen}
                />
            </Tab.Navigator>
        </View>
    );
}

export default Profile;