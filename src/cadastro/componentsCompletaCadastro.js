console.ignoredYellowBox = [
    'Setting a timer'
]
import { styles, images} from '../constants/constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text, View, Button, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Hoshi } from 'react-native-textinput-effects';

export default ComponentsCompletaCadastro = (props) => {
  return (
    <KeyboardAwareScrollView>

        <Hoshi
          style={styles.labelCadastro}
          label={'Telefone com DDD:'}
          labelStyle={{ color: cores.corPrincipal }}
          onChangeText = {props.updateTelefone}
          returnKeyType="next"
          keyboardType="numeric"
          borderColor={cores.corPrincipal}
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Endereço:'}
          labelStyle={{ color: cores.corPrincipal }}
          onChangeText = {props.updateEndereco}
          returnKeyType="next"
          autoCapitalize='words'
          borderColor={cores.corPrincipal}
        />
        <Hoshi
            style={styles.labelCadastro}
            label={'Número Endereço:'}
            labelStyle={{ color: cores.corPrincipal }}
            onChangeText = {props.updateNumeroEnd}
            returnKeyType="next"
            keyboardType="numeric"
            borderColor={cores.corPrincipal}
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Bairro:'}
          labelStyle={{ color: cores.corPrincipal }}
          onChangeText = {props.updateBairro}
          returnKeyType="next"
          autoCapitalize='words'
          borderColor={cores.corPrincipal}
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Referência:'}
          labelStyle={{ color: cores.corPrincipal }}
          onChangeText = {props.updateReferencia}
          returnKeyType="done"
          autoCapitalize='words'
          borderColor={cores.corPrincipal}
        />
        <View style={styles.separator}/>
        <TouchableOpacity
          style={styles.buttons}
          onPress = { () => {props.cadastrarInformacoesBD()} } >
          <Text style={styles.textButtons}>CADASTRAR</Text>
        </TouchableOpacity>
    </KeyboardAwareScrollView>
  )
}
