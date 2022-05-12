import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Recipe from '../pages/Recipe';
import Search from '../pages/Search';
import Menu from '../pages/Menu';
import RegisterRecipe from '../pages/RegisterRecipe';

export type RootStackParamList = {
  Menu: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Recipe: {
    id: string;
  }
  Search: undefined;
  RegisterRecipe: undefined;
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
        <Screen name="Register" component={Register} />
        <Screen name="Recipe" component={Recipe} />
        <Screen name="Search" component={Search} />
        <Screen name="RegisterRecipe" component={RegisterRecipe} />
        <Screen name="Menu" component={Menu} />
      </Navigator>
    </NavigationContainer> 
  );
}

export default AppStack;