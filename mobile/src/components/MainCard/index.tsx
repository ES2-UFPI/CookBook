import React from 'react';
import styled from 'styled-components/native';

const MainCard = () => {
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
  width: 100%;
  height: 215px;
  border-radius: 33px;
  justify-content: flex-end;
  background-color: ${({theme}) => theme.colors.white};
  padding: 16px;
  position: relative;
  overflow: hidden;
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
  padding: 15px 16px;
  background-color: ${({theme}) => theme.colors.grayOpacity};
  border-radius: 20px;
`

const Title = styled.Text`
  font-size: 14px;
  font-family: ${({theme}) => theme.fonts.medium};
  color: ${({theme}) => theme.colors.white};
`

export default MainCard;