
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../constants/constants'


export default class ListaEstabelecimentosListItem extends Component {

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    return (
      <View style={{}}>
      <TouchableOpacity
        style={styles.containerListItem}
        onPress = {() => {
          this.props.navigation.navigate('Estabelecimento',
          {nomeEstabelecimento: this.props.estabelecimento,
          tipoEstabelecimento: this.props.tipoEstabelecimento,
           telaAnterior:"listaEstabelecimentos"})
        }}>
        <Image
          source={{uri:this.props.imglogoEstabelecimento}}
          style={styles.imagemTipoEstabelecimento}
          />
        <View>
          <Text style={styles.textEstabelecimento}>{this.props.estabelecimento}</Text>
          <Text style={styles.textDetalhesEstabelecimento}>{this.props.valorDelivery} | {this.props.tempoEntrega}</Text>
        </View>
      </TouchableOpacity>
      </View>

  )
}

}
