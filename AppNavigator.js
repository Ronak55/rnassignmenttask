import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LocationScreen from './LocationScreen.js';
import ScannerScreen from './ScannerScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Location" component={LocationScreen} />
    <Tab.Screen name="Scanner" component={ScannerScreen} />
  </Tab.Navigator>
);

export default AppNavigator;
