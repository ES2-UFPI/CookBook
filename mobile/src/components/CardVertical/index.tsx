import React from "react";
import { Dimensions, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

interface CardProps extends TouchableOpacityProps {
  image_url: string;
  name: string;
}

const CardVertical = ({ image_url, name, ...rest }: CardProps) => {
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
  width: ${Dimensions.get("window").width * 0.4}px;
  height: 215px;
  border-radius: 33px;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 16px;
  position: relative;
  overflow: hidden;
  margin-right: ${Dimensions.get("window").width * 0.05}px;
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
  padding: 11px 12px;
  background-color: ${({ theme }) => theme.colors.whiteOpacity};
  border-radius: 16px;
`;

const Title = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export default CardVertical;
