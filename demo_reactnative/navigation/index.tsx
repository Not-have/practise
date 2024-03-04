import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/AntDesign';

import Home from '../pages/home';
import Mine from '../pages/mine';

export default function Navigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Login"
                component={Home}
                options={{
                    tabBarIcon: () => (
                        <Icons name="stepbackward" color={'#2e95d3'} />
                    )
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Mine}
                options={{
                    tabBarIcon: () => <Icons name="adduser" color={'#2e95d3'} />
                }}
            />
        </Tab.Navigator>
    );
}
