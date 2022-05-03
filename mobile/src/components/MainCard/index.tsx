import React from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

interface CardProps extends TouchableOpacityProps {
  image_url: string;
  name: string;
}

const MainCard = ({ image_url, name, ...rest }: CardProps) => {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <Image source={{ uri: image_url }} />
      <TitleContainer>
        <Title>{name}</Title>
      </TitleContainer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 215px;
  border-radius: 33px;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 16px;
  position: relative;
  overflow: hidden;
  border-width: 0.5px;
  border-color: ${({ theme }) => theme.colors.grayLight};
`;

const Image = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const TitleContainer = styled.View`
  width: 100%;
  padding: 15px 16px;
  background-color: ${({ theme }) => theme.colors.grayOpacity};
  border-radius: 20px;
`;

const Title = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;

export default MainCard;
