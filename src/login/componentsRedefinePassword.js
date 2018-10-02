console.ignoredYellowBox = [
    'Setting a timer'
]
import { Text, View, TextInput, Image, Button, TouchableHighlight, TouchableOpacity, ImageBackground  } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { Component } from 'react';
import LazyTextInput from '../constants/lazyTextInput';
import LazyBackButton from '../constants/lazyBackButton'
import LazyYellowButton from '../constants/lazyYellowButton'

export default ComponentsRedefinePassword = (props) => {
  return (

      <View style={{flexDirection: 'column', flex: 1}}>
        <LazyBackButton
          goBack={props.goBack}/>
        <Text style={{marginTop: 180,
            fontFamily: 'Futura PT Extra Bold',color: 'white',alignSelf:'center',
            fontSize: 20}}>INFORME O E-MAIL CADASTRADO</Text>
        <LazyTextInput
          style={{marginVertical: 40}}
          nameIcon={'user'}
          placeholder={"E-MAIL"}
          onChangeText={props.textEmail}/>
        <LazyYellowButton
          onPress={ () => {props.sendEmailRedefinition()} }
          text={"ENVIAR E-MAIL PARA REDEFINIR SENHA"}/>
      </View>
)

}
