import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../routes/StackNavigator';
import { Container } from './styles';

type ScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const { navigate } = useNavigation<ScreenProp>();

  return (
    <Container>
      <TouchableOpacity onPress={() => navigate('Login')}>
        <Text>Navigate to login</Text>
      </TouchableOpacity>
    </Container>
  )
}