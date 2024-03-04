import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { style } from './style';

import Icons from 'react-native-vector-icons/AntDesign';

export default function Login(): React.ReactNode {
    return (
        <View style={style.container}>
            <Icons name="home" size={50} color="red" />
            <Text>登录</Text>
            <View>
                <TextInput placeholder="账户" autoCorrect />
            </View>
            <View>
                <TextInput
                    placeholder="密码"
                    autoCorrect
                    scrollEnabled={true}
                />
            </View>
        </View>
    );
}
