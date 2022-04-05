import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 30px;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
` 