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
          {this.props.nomeProduto()}
          {this.props.preco()}
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
