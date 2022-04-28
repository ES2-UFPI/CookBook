import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

interface ButtonIconProps {
  icon: ReactNode;
  onPress: () => void;
}

const ButtonIcon = ({ icon, onPress }: ButtonIconProps) => {
  return (
    <Container onPress={onPress}>
      {icon}
    </Container>
  );
}


const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 55px;
  height: 55px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.white};
` 

export default ButtonIcon;