console.ignoredYellowBox = [
    'Setting a timer'
]
import { styles, images, cores} from '../constants/constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text } from 'react-native';
import React, { Component } from 'react';
import LazyTextInput from '../constants/lazyTextInput';
import LazyYellowButton from '../constants/lazyYellowButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LazyBackButton from '../constants/lazyBackButton'

export default ComponentsAtualizaEndereco= (props) => {
  return (
    <KeyboardAwareScrollView>
      <Text style={[styles.titleCadastro,{marginTop: hp('15%'),marginBottom: hp('2.22%')}]}>ATUALIZE ESTE ENDEREÇO</Text>
    <LazyTextInput
      style={{marginBottom: hp('2.22%')}}
      nameIcon={'home'}
      placeholder={'ENDEREÇO'}
      onChangeText = {props.updateEndereco}
      returnKeyType="next"
      value = {props.endereco}
      autoCapitalize='words'
    />
    <LazyTextInput
      style={{marginBottom: hp('2.22%')}}
      nameIcon={'home'}
      placeholder={'BAIRRO'}
      onChangeText = {props.updateBairro}
      returnKeyType="next"
      value = {props.bairro}
      autoCapitalize='words'
    />
    <LazyTextInput
      style={{marginBottom: hp('2.22%')}}
      nameIcon={'home'}
      placeholder={'REFERÊNCIA'}
      onChangeText = {props.updateReferencia}
      returnKeyType="done"
      value = {props.referencia}
      autoCapitalize='words'
    />
    <LazyYellowButton
      onPress = { () => {props.atualizarEnderecoBD()} }
      text={"ATUALIZAR ENDEREÇO"}/>
    </KeyboardAwareScrollView>
  )
}
