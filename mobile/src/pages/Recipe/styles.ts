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

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryMoreDarker};
  margin-bottom: 20px;
`

export const Image = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 30px;
  border-width: 0.5px;
  border-color: ${({ theme }) => theme.colors.grayLight};
`

export const InfoContainer = styled.View`
  padding: 10px 8px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
` 

export const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  margin-left: 4px;
  align-items: center;
` 

export const InfoTextMinor = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
  font-size: 8px;
` 

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryMoreDarker};
  margin-bottom: 12px;
  margin-top: 12px;
`

export const Ingredient = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`

export const IngredientStrong = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  text-align: justify;
  margin-bottom: 4px;
  padding: 0 5px;
`

export const StarsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 24px;
  padding: 0 5px;
`

export const CommentContainer = styled.View`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 16px;
  border-bottom-left-radius: 0;
  background-color: ${({ theme }) => theme.colors.white};
`

export const CommentText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  padding: 0 10px;
`

export const CommentTime = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.gray};
  font-size: 11px;
`