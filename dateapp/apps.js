import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import NearbyScreen from './screens/NearbyScreen';
import DateRequestsScreen from './screens/DateRequestsScreen';
import ChatScreen from './screens/ChatScreen';
import MatchRequestsScreen from './screens/MatchRequestsScreen';

// Stack.Navigator içine ekle:

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Nearby" component={NearbyScreen} />
        <Stack.Screen name="Requests" component={DateRequestsScreen} />
	<Stack.Screen name="Requests" component={MatchRequestsScreen} />
	<Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}