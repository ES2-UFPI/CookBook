import React from "react";
import { Dimensions, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

interface CardProps extends TouchableOpacityProps {
  image_url: string;
  name: string;
  match?: string;
}

const CardHorizontal = ({ image_url, name, match, ...rest }: CardProps) => {
  return (
    <Container activeOpacity={0.7} {...rest}>
      <Image source={{ uri: image_url }} />
      <TitleContainer>
        <Title>{name}</Title>
        {match && (
          <Match>Match: {(Number(match) * 100).toFixed(0)}%</Match>
        )}
      </TitleContainer>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 90px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 10px;
  position: relative;
  overflow: hidden;
  flex-direction: row;
  margin-right: ${Dimensions.get("window").width * 0.05}px;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 16px;
  margin-right: 10px;
`;

const TitleContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 14px;
  width: 80%;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

const Match = styled.Text`
  font-size: 12px;
  width: 90%;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.gray};
`;

export default CardHorizontal;
