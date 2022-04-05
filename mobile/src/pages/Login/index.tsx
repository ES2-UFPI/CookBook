import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import HeaderPreLogin from '../../components/HeaderPreLogin';
import Input from '../../components/Input';
import { RootStackParamList } from '../../routes/StackNavigator';
import { ButtonContainer, Container, InputContainer, Logo, NavigateToRegisterText, Title } from './styles';

type ScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { navigate } = useNavigation<ScreenProp>();

  const handleLogin = async () => {
    navigate('Home');
  }

  const handleNavigateToRegister = () => {
    navigate('Register');
  }

  return (
    <Container>
      <HeaderPreLogin />
      <Logo> CookBook </Logo>

      <Title> Login </Title>
      <InputContainer>
        <Input 
          value={email} 
          setValue={(e) => setEmail(e)} 
          placeholder='Email' 
        />

        <Input 
          value={password} 
          setValue={(e) => setPassword(e)} 
          placeholder='Senha' 
          secureTextEntry
        />
      </InputContainer>

      <ButtonContainer>
        <Button onPress={handleLogin} title='Login' />
        
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={{marginTop:10}} 
          onPress={handleNavigateToRegister}
        >
          <NavigateToRegisterText>
            Ainda não tem login? Crie uma conta.
          </NavigateToRegisterText>
        </TouchableOpacity>
      </ButtonContainer>
    </Container>
  )
}