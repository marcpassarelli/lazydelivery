import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { styles, images} from '../constants/constants'

export default class PizzaListItem extends Component {

  constructor(props){
    super(props);

  }
  render() {
    const { item } = this.props;
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
          <Text style={styles.textProdutos}>{item.nomeProduto}</Text>
          <Text style={styles.textProdutos}>{(item.preco/this.props.qtdeSabores).toFixed(2)}</Text>
        </View>
        <View style={{flexDirection: 'column', marginLeft:10}}>
          <Text style={styles.textDetalhesEstabelecimento}>{item.detalhes}</Text>
        </View>
      </TouchableOpacity>
      </View>
  )
}

}
//
