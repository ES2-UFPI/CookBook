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

export const SearchContainer = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;
  padding: 0 23px;
`

export const SearchButton = styled.TouchableOpacity`
  height: 42px;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
  justify-content: center;
  flex: 2;
  margin-left: 8px;
`

export const SearchButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryMoreDarker};
  margin-bottom: 20px;
  margin-left: 8px;
`

export const ViewOutlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`

export const Outlay = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
`;

export const ModalContainer = styled.View`
  width: 85%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  padding: 20px;
`;

export const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`

export const TagContainer = styled.View`
  flex-direction: row;
  height: 28px;
  align-items: center;
  padding: 4px 8px;
  margin-bottom: 4px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  margin-right: 6px;
`

export const TagText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 4px;
`