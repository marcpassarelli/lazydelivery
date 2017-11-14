
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, ListView } from 'react-native'
import { styles } from '../constants/constants'

import _ from 'lodash'

export default class ProdutosListItem extends Component {

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    return (
      <TouchableOpacity
        style={styles.containerListItem}
        onPress = {() => {
          this.props.navigation.navigate('Produtos',{estabelecimento: this.props.estabelecimento})
        }}>
        <Image
          source={{uri:this.props.imglogoEstabelecimento}}
          style={styles.imagemTipoEstabelecimento}
          />
        <View>
          <Text style={styles.textEstabelecimento}>{this.props.estabelecimento}</Text>
          <Text style={styles.textDetalhesEstabelecimento}>{this.props.valorDelivery}</Text>
          <Text style={styles.textDetalhesEstabelecimento}>{this.props.tempoEntrega}</Text>
        </View>
      </TouchableOpacity>

  )
}

}
