console.ignoredYellowBox = [
    'Setting a timer'
]
import { styles, images, cores} from '../constants/constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text, View, TextInput, Button,Image } from 'react-native';
import React, { Component } from 'react';
import { Hoshi } from 'react-native-textinput-effects';
import LazyTextInput from '../constants/lazyTextInput';
import Icon from 'react-native-vector-icons/Feather'
import LazyYellowButton from '../constants/lazyYellowButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LazyBackButton from '../constants/lazyBackButton'

export default ComponentsCadastroInicial = (props) => {
  return (
    <KeyboardAwareScrollView>
      <LazyBackButton
        goBack={props.goBack}/>
      <Text style={[styles.titleCadastro,{marginTop: hp('14.7%'),marginBottom: hp('4.32%')}]}>CADASTRE E-MAIL E SENHA</Text>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          nameIcon={'user'}
          placeholder={'E-MAIL'}
          onChangeText={props.updateEmail}
          keyboardType="email-address"
          returnKeyType="next"/>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          nameIcon={'user'}
          placeholder={'CONFIRMAR E-MAIL'}
          onChangeText = {props.updateConfirmarEmail}
          onEndEditing = {props.checarEmail}
          keyboardType="email-address"
          returnKeyType="next"/>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          nameIcon={'lock'}
          placeholder={'SENHA'}
          onChangeText = {props.updateSenha}
          secureTextEntry = {true}
          returnKeyType="next"/>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          nameIcon={'lock'}
          placeholder={'CONFIRMAR SENHA'}
          onChangeText = {props.updateConfirmarSenha}
          secureTextEntry = {true}
          returnKeyType="next"
          onEndEditing = {props.checarSenha}/>
        <LazyYellowButton
          style={{marginBottom: hp('2.22%')}}
          onPress = { () => {props.cadastrarUsuarioBD()} }
          text={"CADASTRAR"}/>
        <View style={{flexDirection: 'row',alignItems: 'center',flexDirection: 'row',
          marginHorizontal: wp('12.31%'),marginBottom: hp('4.6%')}}>
          <Icon
            color={'#d1d1d1'}
            name={props.checked? 'check-square':'square'}
            size={24}
            onPress={()=>{props.functionCheck()}}
            ></Icon>
          <Text style={{fontFamily: 'Futura Book',fontSize: wp('4%'),
            color: 'rgb(176,240,241)', marginLeft: 5}}>
            Lembrar login e senha</Text>
        </View>
        <View style={{backgroundColor: '#FFFFFF',height: hp('0.1%'),marginHorizontal: wp('12.31%'),marginBottom: hp('4.4%')}}></View>
        <Image source={images.iconYellow} style={{height: hp('7.81%'),width: wp('14.81%'),alignSelf: 'center'}}></Image>
      </KeyboardAwareScrollView>
  )
}
