import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../pages/Login';
import Home from '../pages/Home';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
}

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

function AppStack() {
  const [isFirstEnter, setFirstEnter] = useState(true);
  
  useEffect(() => {
    async function getName() {
      const name = await AsyncStorage.getItem("@NAME")
      if(name){
        setFirstEnter(false)
      }
    }
    getName()
  }, [isFirstEnter])

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="Login" component={Login} />
      </Navigator>
    </NavigationContainer> 
  );
}

export default AppStack;