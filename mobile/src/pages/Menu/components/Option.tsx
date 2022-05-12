import { Feather } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacityProps, View } from 'react-native'
import styled from 'styled-components/native'

interface OptionType extends TouchableOpacityProps {
  title: string;
  exit?: boolean
}

export default function Option({ title, exit, ...rest }: OptionType) {
  return (
    <OptionCard style={exit && {borderBottomWidth: 0}} onPress={rest.onPress}>
      <View style={{width: 24, height: 24}} />
      <OptionText style={exit && {color: '#f00'}}>
        { title }
      </OptionText>

      <Feather name="chevron-right" size={24} color="#444" />
    </OptionCard>
  )
}

const OptionCard = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  width: 100%;
  height: 69px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const OptionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray};
` 
