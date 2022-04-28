import React, { ReactNode } from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';

interface InputProps extends TextInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
} 

const Input = ({ value, setValue, placeholder, ...rest }: InputProps) => {
  return (
    <Container value={value} onChangeText={setValue} placeholder={placeholder} {...rest} />
  );
}


const Container = styled.TextInput`
  width: 100%;
  height: 42px;
  border-radius: 11px;
  background-color: ${({theme}) => theme.colors.white};
  padding: 0 16px;
  font-family: ${({theme}) => theme.fonts.regular};
` 

export default Input;