import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import HeaderPreLogin from '../../components/HeaderPreLogin';
import Input from '../../components/Input';
import { RootStackParamList } from '../../routes/StackNavigator';
import { ButtonContainer, Container, InputContainer, Logo, NavigateToLoginText, Title } from './styles';

type ScreenProp = StackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { navigate } = useNavigation<ScreenProp>();

  const handleRegister = async () => {
    navigate('Home');
  }

  const handleNavigateToLogin = () => {
    navigate('Login');
  }

  return (
    <Container>
      <HeaderPreLogin />
      <Logo> CookBook </Logo>

      <Title> Registro </Title>
      <InputContainer>
        <Input 
          value={name} 
          setValue={(e) => setName(e)} 
          placeholder='Nome' 
        />
        
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

        <Input 
          value={passwordConfirm} 
          setValue={(e) => setPasswordConfirm(e)} 
          placeholder='Confirme a senha' 
          secureTextEntry
        />
      </InputContainer>

      <ButtonContainer>
        <Button onPress={handleRegister} title='Registrar' />
        
        <TouchableOpacity 
          activeOpacity={0.7} 
          style={{marginTop:10}}
          onPress={handleNavigateToLogin}
        >
          <NavigateToLoginText>
            Já tem uma conta? Faça o login.
          </NavigateToLoginText>
        </TouchableOpacity>
      </ButtonContainer>
    </Container>
  )
}