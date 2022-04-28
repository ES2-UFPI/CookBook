import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const CardVertical = () => {
  return (
    <Container activeOpacity={0.7}  >
      <Image source={{uri: 'https://img.itdg.com.br/tdg/images/blog/uploads/2017/07/shutterstock_413580649.jpg'}} />
      <TitleContainer>
        <Title>
          Feijão a milanesa
        </Title>
      </TitleContainer>
    </Container>
  );
}


const Container = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width * 0.4}px;
  height: 215px;
  border-radius: 33px;
  justify-content: flex-end;
  background-color: ${({theme}) => theme.colors.white};
  padding: 16px;
  position: relative;
  overflow: hidden;
  margin-right: ${Dimensions.get('window').width * 0.05}px;
`

const Image = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const TitleContainer = styled.View`
  width: 100%;
  padding: 11px 12px;
  background-color: ${({theme}) => theme.colors.whiteOpacity};
  border-radius: 16px;
`

const Title = styled.Text`
  font-size: 12px;
  font-family: ${({theme}) => theme.fonts.medium};
`

export default CardVertical;