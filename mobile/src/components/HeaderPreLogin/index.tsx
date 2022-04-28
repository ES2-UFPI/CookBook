import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import ButtonIcon from '../ButtonIcon';
import { useNavigation } from '@react-navigation/native';

const HeaderPreLogin: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <Container>
      <ButtonIcon 
        onPress={() => goBack()} 
        icon={<Feather name="chevron-left" size={24} color="#5D5FEF" />} 
      />
      
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 110px;
  align-items: center;
  flex-direction: row;
  padding: 0 22px;
` 

export default HeaderPreLogin;