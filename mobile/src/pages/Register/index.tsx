import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, Platform, ToastAndroid, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import HeaderPreLogin from '../../components/HeaderPreLogin';
import Input from '../../components/Input';
import { RootStackParamList } from '../../routes/StackNavigator';
import { signUp } from '../../services/auth.services';
import { ButtonContainer, Container, InputContainer, Logo, NavigateToLoginText, Title } from './styles';

type ScreenProp = StackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [loading, setIsLoading] = useState(false);

  const { navigate } = useNavigation<ScreenProp>();

  const handleRegister = async () => {
    setIsLoading(true);
    if (password !== passwordConfirm) {
      Platform.OS == "android"
        ? ToastAndroid.show("As senhas não são iguais!", 5)
        : Alert.alert("As senhas não são iguais!");
      return;
    }

    try {
      const { data } = await signUp(
        name,
        email,
        password,
        passwordConfirm
      );

      console.log(data);

      Platform.OS == "android"
        ? ToastAndroid.show(`Bem vindo, ${data.name}!`, 5)
        : Alert.alert(`Bem vindo, ${data.name}!`);
      
      navigate('Home');
        
    } catch (error) {
      console.log(error);
      
      alert('Erro ao cadastrar');

      Platform.OS == "android"
        ? ToastAndroid.show(`Houve um erro ao fazer o registro`, 5)
        : Alert.alert(`Houve um erro ao fazer o registro`);
    } finally {
      setIsLoading(false);
    }
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
          keyboardType='email-address'
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
        <Button onPress={handleRegister} title='Registrar' isLoading={loading} />
        
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