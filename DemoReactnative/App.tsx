/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import React from 'react';
// import {Text, View} from 'react-native';

// function App(): React.JSX.Element {
//     return (
//         <View>
//             <Text>你好世界 我是测试</Text>
//             <Text>11</Text>
//         </View>
//     );
// }

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './navigator';

function App(): React.ReactNode {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
}

export default App;
