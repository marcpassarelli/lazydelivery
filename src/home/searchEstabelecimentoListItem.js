import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, ListView } from 'react-native'
import { styles, images} from '../constants/constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import StatusBar from '../constants/statusBar'
import {atualizarAberto,atualizarFrete}from'../home/home'
import { getEstabelecimentoProd } from '../firebase/database'


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
      <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={[styles.containerSearchListItem,{marginBottom:5}]}
        onPress = {() => {
          if(this.props.frete=='gratis'){
            atualizarFrete(0)
          }else{
            atualizarFrete(this.props.frete)
          }
          atualizarAberto(this.props.aberto,this.props.fechando,this.props.horarioFechamento)
          this.props.navigation.navigate('Estabelecimento',
          {nomeEstabelecimento: this.props.estabelecimento,
           tipoEstabelecimento: this.props.tipoEstabelecimento, telaAnterior:"home"})
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
      {this.props.aberto?
      <View></View>:
      <View style={{marginRight:wp('5.31%'),alignContent: 'center',alignItems:'center',justifyContent: 'center'}}>
        {
          this.props.aberto?
          <View></View> :
          <Text style={[styles.textDetalhesEstabelecimento,{color: 'red',fontSize:wp('4%')}]}>FECHADO</Text>
        }
      </View>
      }
    </View>

  )
}

}
