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
            style={{marginBottom: hp('4%')}}
        onPress = {()=>{props.logintToCadastro()}}
        text={"CADASTRE-SE"}>
      </LazyYellowButton>

      <LazyYellowButton
        style={{marginBottom: hp('4%')}}
        onPress = { () => {props.loginToHome()}}
        text={"LOGIN COM E-MAIL"}>
      </LazyYellowButton>

      <TouchableHighlight
        style={styles.containerButtonFacebook}
        onPress = {()=>{props.loginWithFacebook()}} >
        <View style={{flexDirection: 'row'}}>
        <Image source={images.logoFacebook} style={styles.imglogoFB}></Image>
        <Text style={styles.textButtons}>LOGIN COM O FACEBOOK</Text>
        </View>
      </TouchableHighlight>

      <Text style={{alignSelf: 'center', color: 'white',
        fontFamily: 'Futura-Medium',marginVertical:hp('4%'),
        textShadowOffset: {width: -5,height: 5},
        textShadowRadius: 20,textShadowColor: 'black',
        fontSize: wp('4%')}}>OU</Text>

      <LazyYellowButton
        onPress = {()=>{props.loginSemCadastro()}}
        text={"ENTRAR SEM CADASTRO"}/>

      <Text style={{alignSelf: 'center', color: 'white',
        fontFamily: 'Futura-Medium',marginVertical:hp('2%'),
        fontSize: wp('4%'),marginHorizontal: hp('2%'),textShadowOffset: {width: -5,height: 5},
        textShadowRadius: 20,textShadowColor: 'black',
        textAlign: 'center'}}>Entrando sem cadastro suas informações não ficarão salvas para o próximo pedido e você não terá o histórico de pedidos salvo.</Text>
</View>
)

}
