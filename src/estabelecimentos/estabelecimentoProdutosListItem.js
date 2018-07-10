import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native'
import {getListaAdicionais} from '../firebase/database'
import { styles } from '../constants/constants'
import Loader from '../loadingModal/loadingModal'

export default class EstabelecimentoProdutosListItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false
    }
  }
  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    return (

      <View>
      <TouchableOpacity
        style={styles.containerListItemProdutos}
        onPress = {() => {
        this.props.navigation()
        }}>
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
          <Text style={styles.textProdutos}>{this.props.nomeProduto}</Text>
          {this.props.preco()}
        </View>
        <View style={{flexDirection: 'column', marginLeft:10}}>
          <Text style={styles.textDetalhesEstabelecimento}>{this.props.detalhes}</Text>
        </View>
      </TouchableOpacity>
      </View>
  )
}

}
//
