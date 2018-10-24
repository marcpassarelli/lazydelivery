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

export default ComponentsAtualizaCadastro = (props) => {
  return (
    <KeyboardAwareScrollView>
    <Text style={[styles.titleCadastro,{marginTop: hp('30%'),marginBottom: hp('3%')}]}>ATUALIZE O SEU CADASTRO</Text>
    <LazyTextInput
      style={{marginBottom: hp('3%')}}
      nameIcon={'user'}
      placeholder={'NOME'}
      onChangeText = {props.updateNome}
      returnKeyType="next"
      autoCapitalize="words"
      value = {props.nome}
    />
    <LazyTextInput
      style={{marginBottom: hp('3%')}}
      nameIcon={'phone'}
      placeholder={'TELEFONE'}
      onChangeText = {props.updateTelefone}
      returnKeyType="next"
      keyboardType="numeric"
      value = {props.telefone}
    />
    <LazyYellowButton
      onPress = { () => {props.atualizarInformacoesBD()} }
      text={"ATUALIZAR INFORMAÇÕES"}/>
    </KeyboardAwareScrollView>
  )
}
