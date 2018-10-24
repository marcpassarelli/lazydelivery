console.ignoredYellowBox = [
    'Setting a timer'
]
import { styles, images, cores} from '../constants/constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text, View, Button, TouchableOpacity,Image } from 'react-native';
import React, { Component } from 'react';
import { Hoshi } from 'react-native-textinput-effects';
import LazyTextInput from '../constants/lazyTextInput';
import LazyYellowButton from '../constants/lazyYellowButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default ComponentsCompletaCadastro = (props) => {
  return (
    <KeyboardAwareScrollView>
      <Text style={[styles.titleCadastro,{marginTop:hp('8%'),marginBottom: hp('3%')}]}>COMPLETE O SEU CADASTRO</Text>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          nameIcon={'user'}
          placeholder={'NOME'}
          value = {props.nome}
          onChangeText={props.updateNome}
          keyboardType="email-address"
          autoCapitalize="words"
          returnKeyType="next"/>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          value = {props.telefone}
          nameIcon={'phone'}
          placeholder={'TELEFONE COM DDD'}
          onChangeText={props.updateTelefone}
          keyboardType="numeric"
          returnKeyType="next"/>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          nameIcon={'home'}
          placeholder={'ENDEREÇO COM NÚMERO'}
          onChangeText={props.updateEndereco}
          autoCapitalize='words'
          returnKeyType="next"/>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          nameIcon={'home'}
          placeholder={'BAIRRO'}
          onChangeText={props.updateBairro}
          returnKeyType="next"
          autoCapitalize='words'/>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          nameIcon={'home'}
          placeholder={'REFERÊNCIA'}
          onChangeText={props.updateReferencia}
          returnKeyType="done"
          autoCapitalize='words'/>
        <LazyYellowButton
          style={{marginBottom: hp('4.22%')}}
          onPress = { () => {props.cadastrarInformacoesBD()} }
          text={"CADASTRAR"}/>
        <View style={{backgroundColor: '#FFFFFF',height: hp('0.1%'),marginHorizontal: wp('12.31%'),marginBottom: hp('4.4%')}}></View>
        <Image source={images.iconYellow} style={{height: hp('7.81%'),width: wp('14.81%'),alignSelf: 'center'}}></Image>
    </KeyboardAwareScrollView>
  )
}
