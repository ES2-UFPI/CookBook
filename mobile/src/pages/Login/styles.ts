import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-top: 20px;
  background-color: ${({ theme }) => theme.colors.background};
` 

export const Logo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondaryBold};
  color: ${({ theme }) => theme.colors.primaryDarker};
  font-size: 40px;
  margin-top: 20px;
  margin-left: 16px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  margin: 10px 23px;
  margin-top: 30%;
`;

export const InputContainer = styled.View`
  width: 100%;
  padding: 0 23px;
  justify-content: space-between;
  height: 100px;
`

export const ButtonContainer = styled.View`
  margin-top: 69px;
  width: 100%;
  padding: 0 23px;
`