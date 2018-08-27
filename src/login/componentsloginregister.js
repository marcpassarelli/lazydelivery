console.ignoredYellowBox = [
    'Setting a timer'
]
import { Text, View, TextInput, Image, Button, TouchableHighlight, TouchableOpacity  } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { Component } from 'react';

export default ComponentsLoginRegister = (props) => {
  return (
      <KeyboardAwareScrollView>
          <Text style={styles.titleCadastro}>Login</Text>
          <Hoshi
            style={styles.textInputs}
            label={'Email:'}
            //autoFocus = {true}
            onChangeText = {props.updateEmail}
            labelStyle={{ color: cores.corPrincipal }}
            borderColor={cores.corPrincipal}
            returnKeyType="next"
           />
          <Hoshi
            style={styles.labelCadastro}
            label={'Senha:'}
            labelStyle={{ color: cores.corPrincipal }}
            onChangeText = {props.updateSenha}
            secureTextEntry = {true}
            borderColor={cores.corPrincipal}
            returnKeyType="done"
          />
          <View style={styles.separator} />
      <TouchableOpacity
        style={styles.buttons}
        onPress = { () => {props.loginToHome()} } >
        <Text style={styles.textButtons}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        style={styles.buttons}
        onPress = {()=>{props.logintToCadastro()}} >
        <Text style={styles.textButtons}>PRIMEIRO ACESSO? CADASTRE-SE</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <Text style={{textAlign:'center', fontSize:16, color:cores.corPrincipal}}>Ou faça o login com o Facebook:</Text>
      <TouchableHighlight
        underlayColor='rgba(0,0,0,0)'
        onPress={()=>{props.loginWithFacebook()}}>
          <Image
            style={styles.buttonFacebook}
            source={require('../../img/loginFacebook.png')}
          />
      </TouchableHighlight>
</KeyboardAwareScrollView>
)

}
