import React from 'react';
import { View, Text, Button } from 'react-native';

// import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/AntDesign';

export default function Home(): React.JSX.Element {
    // const navigation = useNavigation();
    return (
        <View>
            <Text>Home</Text>
            <Icons name="stepforward" size={50} color="red" />

            <Button title="Go to Details" />
        </View>
    );
}
