console.ignoredYellowBox = [
    'Setting a timer'
]
import { styles } from '../constants/constants'
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
          labelStyle={{ color: '#8b0000' }}
          onChangeText = {props.updateTelefone}
          returnKeyType="next"
          keyboardType="numeric"
          borderColor={'#8b0000'}
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Endereço:'}
          labelStyle={{ color: '#8b0000' }}
          onChangeText = {props.updateEndereco}
          returnKeyType="next"
          autoCapitalize='words'
          borderColor={'#8b0000'}
        />
        <Hoshi
            style={styles.labelCadastro}
            label={'Número Endereço:'}
            labelStyle={{ color: '#8b0000' }}
            onChangeText = {props.updateNumeroEnd}
            returnKeyType="next"
            keyboardType="numeric"
            borderColor={'#8b0000'}
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Bairro:'}
          labelStyle={{ color: '#8b0000' }}
          onChangeText = {props.updateBairro}
          returnKeyType="next"
          autoCapitalize='words'
          borderColor={'#8b0000'}
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Referência:'}
          labelStyle={{ color: '#8b0000' }}
          onChangeText = {props.updateReferencia}
          returnKeyType="done"
          autoCapitalize='words'
          borderColor={'#8b0000'}
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
