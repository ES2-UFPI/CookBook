import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import ButtonIcon from '../ButtonIcon';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

interface HeaderProps {
  onPressLeft: () => void;
  onPressRight: () => void;
}

const Header = ({ onPressLeft, onPressRight }: HeaderProps) => {
  return (
    <Container>
      <ButtonIcon 
        onPress={onPressLeft} 
        icon={<Feather name="user" size={24} color="#5D5FEF" />} 
      />

      <Title>
        CookBook
      </Title>
      
      <ButtonIcon 
        onPress={onPressRight} 
        icon={<Feather name="search" size={24} color="#5D5FEF" />} 
      />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 110px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
` 

const Title = styled.Text`
  font-size: 33px;
  color: ${({ theme }) => theme.colors.primaryDarker};
  font-family: ${({ theme }) => theme.fonts.secondaryBold};
`

export default Header;