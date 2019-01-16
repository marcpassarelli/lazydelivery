import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles, images,cores} from '../constants/constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { semCadastro } from '../login/loginregister'
import LazyTextInput from '../constants/lazyTextInput';

export default class ResumoInformacoes extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <View>
        {this.props.retirar ?
          <View></View>
        :
        <View style={{marginLeft:5,marginTop:5}}>
          <Text style={[styles.textAdicionais,{marginBottom:hp('1%'), fontFamily:'FuturaBT-MediumItalic',fontSize: wp('4.5%')}]}>Informações para Entrega:</Text>
          {semCadastro?
            <View>
              <LazyTextInput
                style={{marginBottom: hp('1%')}}
                nameIcon={'user'}
                placeholder={'NOME'}
                onChangeText = {this.props.updateNome}
                returnKeyType="next"
                autoCapitalize="words"
                value = {this.props.nome}
              />
              <LazyTextInput
                style={{marginBottom: hp('1%')}}
                nameIcon={'phone'}
                placeholder={'TELEFONE COM DDD'}
                onChangeText = {this.props.updateTelefone}
                returnKeyType="next"
                keyboardType="numeric"
                value = {this.props.telefone}
              />
            </View>
          :
            <View>
            <View style={{flexDirection: 'row',marginHorizontal: 10}}>
              <Text style={[styles.textResumoPgto,{color: cores.textDetalhes}]}>Entregar para: </Text>
              <Text style={[styles.textResumoPgto,{color:'#616161'}]}>{this.props.nome}</Text>
            </View>
            <View style={{flexDirection: 'row',marginHorizontal: 10}}>
              <Text style={[styles.textResumoPgto,{color: cores.textDetalhes}]}>Telefone para Contato: </Text>
              <Text style={[styles.textResumoPgto,{color:'#616161'}]}>{this.props.telefone}</Text>
            </View>
            </View>
          }

          <View style={{flexDirection: 'row',marginHorizontal: 10}}>
            <Text style={[styles.textResumoPgto,{color: cores.textDetalhes}]}>Endereço: </Text>
            <Text style={[styles.textResumoPgto,{color:'#616161'}]}>{this.props.endereco}</Text>
          </View>
          <View style={{flexDirection: 'row',marginHorizontal: 10}}>
            <Text style={[styles.textResumoPgto,{color: cores.textDetalhes}]}>Bairro: </Text>
            <Text style={[styles.textResumoPgto,{color:'#616161'}]}>{this.props.bairro}</Text>
          </View>
          <View style={{flexDirection: 'row',marginHorizontal: 10}}>
            <Text style={[styles.textResumoPgto,{color: cores.textDetalhes}]}>Referência: </Text>
            <Text style={[styles.textResumoPgto,{color:'#616161'}]}>{this.props.referencia}</Text>
          </View>
        </View>
      }
      </View>
    )
  }
}
