import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
} 

const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <Container activeOpacity={0.7} {...rest} >
      <Title>
        {title}
      </Title>
    </Container>
  );
}


const Container = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  border-radius: 11px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.primary};
` 

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
`;

export default Button;