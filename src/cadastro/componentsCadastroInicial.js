console.ignoredYellowBox = [
    'Setting a timer'
]
import { styles } from '../constants/constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text, View, TextInput, Image, KeyboardAvoidingView, Button } from 'react-native';
import React, { Component } from 'react';
import { Hoshi } from 'react-native-textinput-effects';

export default ComponentsCadastroInicial = (props) => {
  return (
    <KeyboardAwareScrollView>
        <Text style={styles.titleCadastro}>Cadastre Email e Senha</Text>
        <Hoshi
          style={styles.labelCadastro}
          label={'Email:'}
          labelStyle={{ color: '#8b0000' }}
          borderColor={'#8b0000'}
          autoFocus = {true}
          keyboardType="email-address"
          returnKeyType="next"
          onChangeText = {props.updateEmail}
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Confirmar Email:'}
          labelStyle={{ color: '#8b0000' }}
          borderColor={'#8b0000'}
          keyboardType="email-address"
          returnKeyType="next"
          onChangeText = {props.updateConfirmarEmail}
          onEndEditing = {props.checarEmail}
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Senha:'}
          labelStyle={{ color: '#8b0000' }}
          borderColor={'#8b0000'}
          onChangeText = {props.updateSenha}
          secureTextEntry = {true}
          returnKeyType="next"
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Confirmar Senha:'}
          labelStyle={{ color: '#8b0000' }}
          borderColor={'#8b0000'}
          onChangeText = {props.updateConfirmarSenha}
          secureTextEntry = {true}
          returnKeyType="next"
          onEndEditing = {props.checarSenha}
        />
        <Button
          onPress = { () => cadastrarUsuarioBD() }
          title="Cadastrar"
          color="#8b0000"
          accessibilityLabel="Clique aqui para cadastrar o endereço"
          alignSelf= "center"
        />
    </KeyboardAwareScrollView>
  )
}
