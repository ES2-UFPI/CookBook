import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import AppStack from './src/routes/StackNavigator';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppStack/>
    </ThemeProvider>
  );
}
