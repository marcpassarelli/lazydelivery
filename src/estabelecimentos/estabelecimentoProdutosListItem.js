import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native'
import {getListaAdicionais} from '../firebase/database'
import { styles, images} from '../constants/constants'
import Loader from '../loadingModal/loadingModal'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
        {this.props.tipoProduto=="Pizzas"?
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <View style={{}}>
            <Text style={[styles.textProdutos,{flex: 1,flexWrap: 'wrap'}]}>{this.props.nomeProduto}</Text>
            </View>
            <View>
            {this.props.preco()}
            </View>
          </View>
        :
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
          <View style={{width: wp('70%'),flexDirection: 'row'}}>
          <Text style={[styles.textProdutos,{flex: 1,flexWrap: 'wrap'}]}>{this.props.nomeProduto}</Text>
          </View>
          <View style={{width:wp('22%')}}>
          {this.props.preco()}
          </View>
        </View>
        }

        <View style={{flexDirection: 'column', marginLeft:10}}>
          <Text style={styles.textDetalhesEstabelecimento}>{this.props.detalhes}</Text>
        </View>
      </TouchableOpacity>
      </View>
  )
}

}
//
