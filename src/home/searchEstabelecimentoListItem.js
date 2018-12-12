import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, ListView } from 'react-native'
import { styles, images} from '../constants/constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import StatusBar from '../constants/statusBar'
import { getEstabelecimentoProd, } from '../firebase/database'

import _ from 'lodash'

var frete=0

export default class SearchEstabelecimentoListItem extends Component {

  functionValorFrete(valorFrete){
    if(valorFrete=='n'){
      return(
          <Text style={[styles.textTipoEstabelecimento,{fontSize: wp('3%'),color:'red'}]}>NÃO ENTREGA NO BAIRRO ESCOLHIDO.</Text>)
    }else if(valorFrete=='gratis'){
      return(
        <Text style={[styles.textTipoEstabelecimento,{fontSize: wp('3%'),color:'green'}]}>FRETE GRÁTIS</Text>)
  }else{
    return(
      <View>
      <Text style={[styles.textTipoEstabelecimento,{fontSize: wp('3%')}]}>Frete: R$ {this.preco(valorFrete)}</Text>
      </View>)
    }
  }

  preco(valorFrete){
    var str = (valorFrete).toFixed(2)
    var res = str.toString().replace(".",",")
    return(
      <Text>{res}</Text>
      )
  }

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    return (
      <TouchableOpacity
        style={[styles.containerSearchListItem,{marginBottom:5}]}
        onPress = {() => {
          if(this.props.frete=='gratis'){
            frete = 0
          }else{
            frete = this.props.frete
          }
          this.props.navigation.navigate('Estabelecimento',
          {nomeEstabelecimento: this.props.estabelecimento,
           tipoEstabelecimento: this.props.tipoEstabelecimento, telaAnterior:"home",
          frete:frete})
        }}>
        <Image
          source={{uri:this.props.imglogo}}
          style={styles.imagemListSearch}
          />
        <View>
          <Text
            style={styles.textTipoEstabelecimento}>{this.props.estabelecimento}</Text>
          {this.functionValorFrete(this.props.frete)}
        </View>
      </TouchableOpacity>

  )
}

}
