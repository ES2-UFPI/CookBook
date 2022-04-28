import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-top: 20px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
` 

export const ContentWrapper = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 20,
  }
})`
  padding: 0 23px;
  width: 100%;
  height: 100%;
`

export const Carousel = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  paginationEnabled: true,
})
``

export const CarouselTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryMoreDarker};
  margin-top: 30px;
`