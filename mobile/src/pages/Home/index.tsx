import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import CardVertical from '../../components/CardVertical';
import Header from '../../components/Header';
import MainCard from '../../components/MainCard';
import { RootStackParamList } from '../../routes/StackNavigator';
import { Carousel, CarouselTitle, Container, ContentWrapper } from './styles';

type ScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const { navigate } = useNavigation<ScreenProp>();

  return (
    <Container>
      <ContentWrapper>
        <Header 
          onPressLeft={() => navigate('Login')} 
          onPressRight={() => navigate('Home')} 
        />

        <MainCard />

        <CarouselTitle>
          Ofertas
        </CarouselTitle>

        <Carousel>
          <CardVertical />
          <CardVertical />
          <CardVertical />
          <CardVertical />
        </Carousel> 

        <CarouselTitle>
          Ofertas
        </CarouselTitle>

        <Carousel>
          <CardVertical />
          <CardVertical />
          <CardVertical />
          <CardVertical />
        </Carousel> 

        <CarouselTitle>
          Ofertas
        </CarouselTitle>

        <Carousel>
          <CardVertical />
          <CardVertical />
          <CardVertical />
          <CardVertical />
        </Carousel> 

        <CarouselTitle>
          Ofertas
        </CarouselTitle>

        <Carousel>
          <CardVertical />
          <CardVertical />
          <CardVertical />
          <CardVertical />
        </Carousel> 
      </ContentWrapper>
    </Container>
  )
}