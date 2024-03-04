import React from 'react';
import { View, Text } from 'react-native';

import Icons from 'react-native-vector-icons/AntDesign';

export default function Home(): React.JSX.Element {
    return (
        <View>
            <Text>Home</Text>
            <Icons name="stepforward" size={50} color="red" />
        </View>
    );
}
