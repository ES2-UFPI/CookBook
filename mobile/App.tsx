import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import AppStack from './src/routes/StackNavigator';
import { 
  RobotoSlab_400Regular, 
  RobotoSlab_500Medium, 
  RobotoSlab_700Bold, 
} from '@expo-google-fonts/roboto-slab'
import { 
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_700Bold 
} from '@expo-google-fonts/poppins'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './src/services/api';
import { useEffect } from 'react';

export default function App() {

  let [fontsLoaded] = useFonts({
    RobotoSlab_400Regular, 
    RobotoSlab_500Medium, 
    RobotoSlab_700Bold, 
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // const getToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('@cookbook:token');
  //     if (token) {
  //       api.defaults.headers = {
  //         'Authorization': `Bearer ${token}`
  //       } as any;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getToken();
  // }, [])

  return (
    <ThemeProvider theme={theme}>
      <AppStack/>
    </ThemeProvider>
  );
}
