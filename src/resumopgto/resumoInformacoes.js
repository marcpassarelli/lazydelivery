import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles, images} from '../constants/constants'


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
        <View>
          <Text style={[styles.textAdicionais,{fontSize: 16}]}>Informações para Entrega</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textResumoPgto}>Entregar para: </Text>
            <Text>{this.props.nome}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textResumoPgto}>Telefone para Contato: </Text>
            <Text>{this.props.telefone}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textResumoPgto}>Endereço: </Text>
            <Text>{this.props.endereco}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textResumoPgto}>Bairro: </Text>
            <Text>{this.props.bairro}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textResumoPgto}>Referência: </Text>
            <Text>{this.props.referencia}</Text>
          </View>
        </View>
      }
      </View>
    )
  }
}
