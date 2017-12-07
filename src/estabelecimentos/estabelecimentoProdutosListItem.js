
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, ListView } from 'react-native'
import { styles } from '../constants/constants'

import _ from 'lodash'

export default class EstabelecimentoProdutosListItem extends Component {

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
        <View>
          <Text style={styles.textEstabelecimento}>{this.props.nomeProduto}</Text>
          <Text style={styles.textDetalhesEstabelecimento}>{this.props.preco}</Text>
          <Text style={styles.textDetalhesEstabelecimento}>{this.props.detalhes}</Text>
        </View>
      </TouchableOpacity>

  )
}

}
