console.ignoredYellowBox = [
    'Setting a timer'
]
import { Text, View, TextInput, Image, Button, TouchableHighlight, TouchableOpacity, ImageBackground  } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import { Hideo } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { Component } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import LazyTextInput from '../constants/lazyTextInput';
import LazyBackButton from '../constants/lazyBackButton'
import LazyYellowButton from '../constants/lazyYellowButton'

export default ComponentsLoginEmail = (props) => {
  return (
    <KeyboardAwareScrollView>
      <LazyBackButton
        goBack={props.goBack}/>
      <LazyTextInput
          style={{marginBottom: hp('2.3%'), marginTop: hp('34%')}}
          nameIcon={'user'}
          placeholder={'E-MAIL'}
          onChangeText={props.textEmail}/>
      <LazyTextInput
        style={{marginBottom: hp('3%')}}
        nameIcon={'lock'}
        placeholder={'SENHA'}
        secureTextEntry={true}
        onChangeText={props.textSenha}/>
      <LazyYellowButton
        style={{marginBottom: hp('3%')}}
        onPress = {()=>{props.loginToHome()}}
        text={"LOGIN"} >
      </LazyYellowButton>

      <View style={{flexDirection: 'row',alignItems: 'center',
        justifyContent: 'flex-end',marginHorizontal: wp('12.31%'),
        marginBottom: hp('4.43%')}}>
        <Text style={{fontFamily: 'Futura Medium Italic BT',color: 'white'}}
          onPress={()=>{props.esqueciSenha()}}>Esqueceu a senha?</Text>
      </View>
      <View style={{backgroundColor: '#FFFFFF',height: hp('0.1%'),marginHorizontal: wp('12.31%')}}></View>
</KeyboardAwareScrollView>
)

}

// <CheckBox
//   containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderColor: 'rgba(0,0,0,0)'}}
//   size={24}
//   checked={props.checked}>
// </CheckBox>
