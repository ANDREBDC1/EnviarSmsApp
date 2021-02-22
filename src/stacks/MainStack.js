import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import Preload from '../screens/Preload'
import SignUp from '../screens/SignUp'
import Home from '../screens/Home'


const Stack = createStackNavigator()

export default () => (

    <Stack.Navigator
        initialRouteName = "Preload"
        screenOptions ={{
            headerShown : false

        }}
    >
        <Stack.Screen name = "Preload" component = {Preload} />
        <Stack.Screen name = "SignUp" component = {SignUp} />
        <Stack.Screen name = "Home" component = {Home} />
    </Stack.Navigator>

)