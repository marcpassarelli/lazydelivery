
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { styles, images} from '../constants/constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

var frete =0
export default class ListaEstabelecimentosListItem extends Component {

  functionValorFrete(valorFrete){
    if(valorFrete=='n'){
      return(
          <Text style={[styles.textDetalhesEstabelecimento,{color:'red'}]}>NÃO ENTREGA NO BAIRRO ESCOLHIDO.</Text>)
    }else if(valorFrete=='gratis'){
      return(
        <Text style={[styles.textDetalhesEstabelecimento,{color:'green'}]}>FRETE GRÁTIS</Text>)
  }else{
    return(
      <View>
      <Text style={styles.textDetalhesEstabelecimento}>Frete: R$ {this.preco(valorFrete)}</Text>
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
        style={this.props.aberto ? styles.containerListItem : styles.containerListItemDisabled}
        onPress = {() => {
          console.log("props.delivery"+this.props.valorDelivery);
          if(this.props.valorDelivery=='gratis'){
            frete = 0
          }else{
            frete = this.props.valorDelivery
          }
          this.props.navigation.push('Estabelecimento',
          {nomeEstabelecimento: this.props.estabelecimento,
          tipoEstabelecimento: this.props.tipoEstabelecimento,
          frete:frete,
           telaAnterior:"listaEstabelecimentos"})
           console.log("frete ao selecionar restaurante "+frete);
        }}>
        <Image
          source={{uri:this.props.imglogoEstabelecimento}}
          style={styles.imagemListaEstabelecimento}
          />
        <View>
          <Text style={styles.textEstabelecimento}>{this.props.estabelecimento}</Text>
          {this.functionValorFrete(this.props.valorDelivery)}
          <Text style={styles.textDetalhesEstabelecimento}>Entrega: {this.props.tempoEntrega}</Text>
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
