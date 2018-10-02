console.ignoredYellowBox = [
    'Setting a timer'
]
import { Text, View, TextInput, Image, Button, TouchableHighlight, TouchableOpacity, ImageBackground  } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { Component } from 'react';
import LazyYellowButton from '../constants/lazyYellowButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default ComponentsLoginRegister = (props) => {
  return (
      <View style={{flexDirection: 'column', flex: 1}}>
      <Image
        source={images.logoLogin}
        style={styles.logoLogin}
        />

      <LazyYellowButton
        style={{marginBottom: hp('4.98%')}}
        onPress = { () => {props.loginToHome()}}
        text={"LOGIN COM E-MAIL"}>
      </LazyYellowButton>

      <LazyYellowButton
            style={{marginBottom: hp('4.98%')}}
        onPress = {()=>{props.logintToCadastro()}}
        text={"CADASTRE-SE"}>
      </LazyYellowButton>

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
