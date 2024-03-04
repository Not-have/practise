/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './navigation';

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
}

export default App;
