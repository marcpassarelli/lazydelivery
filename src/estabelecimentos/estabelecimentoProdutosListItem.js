
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
      <View
        onLayout={this.props.onLayout}>
      <TouchableOpacity
        style={styles.containerListItemProdutos}
        onPress = {() => {
          this.props.navigation.navigate('Produtos',{estabelecimento: this.props.estabelecimento})
        }}>
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
          <Text style={styles.textProdutos}>{this.props.nomeProduto}</Text>
          <Text style={styles.textPreco}>{this.props.preco}</Text>
        </View>
        <View style={{flexDirection: 'column', marginLeft:10}}>
          <Text style={styles.textDetalhesEstabelecimento}>{this.props.detalhes}</Text>
        </View>
      </TouchableOpacity>
      </View>
  )
}

}
