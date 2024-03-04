import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/AntDesign';

import Home from '../pages/home';
import Mine from '../pages/mine';
import Details from '../pages/details';

export default function Navigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarLabel: '首页',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icons name="home" color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="mine"
                component={Mine}
                options={{
                    tabBarLabel: '我的',
                    tabBarIcon: ({ color }) => (
                        <Icons name="adduser" color={color} />
                    )
                }}
            />
            <Tab.Screen name="Details" component={Details} />
        </Tab.Navigator>
    );
}
