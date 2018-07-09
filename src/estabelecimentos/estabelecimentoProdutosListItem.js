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
        this.props.navigation.navigate('AddProduto',{nomeEstabelecimento: this.props.estabelecimento,
        nome: this.props.nomeProduto, preco: this.props.preco, detalhes: this.props.detalhes,
        imgProduto: this.props.imgProduto, tipoProduto: this.props.tipoProduto,
        tipoEstabelecimento: this.props.navigation.state.params.tipoEstabelecimento})
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
