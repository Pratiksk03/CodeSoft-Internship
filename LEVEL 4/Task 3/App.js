import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AlarmListScreen from './screens/AlarmListScreen';
import AlarmSetScreen from './screens/AlarmSetScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Alarms" component={AlarmListScreen} />
        <Stack.Screen name="Set Alarm" component={AlarmSetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
