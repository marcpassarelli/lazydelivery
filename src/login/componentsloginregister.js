console.ignoredYellowBox = [
    'Setting a timer'
]
import { Text, View, TextInput, Image, Button, TouchableHighlight, TouchableOpacity, ImageBackground  } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { Component } from 'react';

export default ComponentsLoginRegister = (props) => {
  return (
      <View style={{flexDirection: 'column', flex: 1}}>
      <Image
        source={images.logoLogin}
        style={styles.logoLogin}
        />

      <TouchableHighlight
        style={styles.buttons}
        onPress = { () => {props.loginToHome()} }>
        <Text style={styles.textButtons}>LOGIN COM E-MAIL</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.buttons}
        onPress = {()=>{props.logintToCadastro()}} >
        <Text style={styles.textButtons}>CADASTRE-SE</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.containerButtonFacebook}
        onPress = {()=>{props.loginWithFacebook()}} >
        <View style={{flexDirection: 'row'}}>
        <Image source={images.logoFacebook} style={styles.imglogoFB}></Image>
        <Text style={styles.textButtons}>LOGIN COM O FACEBOOK</Text>
        </View>
      </TouchableHighlight>
</View>
)

}
