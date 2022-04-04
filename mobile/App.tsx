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

  return (
    <ThemeProvider theme={theme}>
      <AppStack/>
    </ThemeProvider>
  );
}
