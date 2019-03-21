
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { styles, images} from '../constants/constants'
import {atualizarAberto,atualizarFrete} from '../home/home'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

var frete =0

export default class ListaEstabelecimentosListItem extends Component {

  functionValorFrete(valorFrete){
    if(valorFrete=='n'){
      return(
          <Text style={[styles.textDetalhesEstabelecimento,{color:'red'}]}>NÃO ENTREGA NO BAIRRO ESCOLHIDO.</Text>)
    }else if(valorFrete=='gratis'){
      return(
        <Text style={[styles.textDetalhesEstabelecimento,{color:'green'}]}>ENTREGA GRÁTIS</Text>)
  }else{
    return(
      <View>
      <Text style={styles.textDetalhesEstabelecimento}>Taxa de Entrega: R$ {this.preco(valorFrete)}</Text>
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
            console.log("frete 0");
            atualizarFrete(frete)
          }else{
            console.log("frete "+this.props.valorDelivery);
            atualizarFrete(this.props.valorDelivery)
          }
          atualizarAberto(this.props.aberto,this.props.fechando,this.props.horarioFechamento)
          console.log("props.aberto"+this.props.aberto);
          this.props.navigation.push('Estabelecimento',
          {nomeEstabelecimento: this.props.estabelecimento,
          tipoEstabelecimento: this.props.tipoEstabelecimento,
           telaAnterior:"listaEstabelecimentos"})
           console.log("frete ao selecionar restaurante "+frete);
        }}>
        <View>
        <View style={{flexDirection: 'row'}}>
        <View>
          <View style={styles.viewIcon}>
            <Image
              source={{uri:this.props.imglogoEstabelecimento}}
              style={styles.imagemListaEstabelecimento}
              />
          </View>
        </View>
        <View>
          <Text style={styles.textEstabelecimento}>{this.props.estabelecimento}</Text>
          {this.functionValorFrete(this.props.valorDelivery)}
          <Text style={styles.textDetalhesEstabelecimento}>Entrega: {this.props.tempoEntrega}</Text>
        </View>
        </View>
        <View>
        {this.props.aberto?
        <View></View>:
        <View style={{alignContent: 'center',alignItems:'center',justifyContent: 'center'}}>
          {
            this.props.aberto?
            <View></View> :
            <Text style={[styles.textDetalhesEstabelecimento,{marginLeft: 0,alignSelf: 'center',color: 'red',fontSize:wp('4%')}]}>FECHADO</Text>
          }
          </View>
        }
        </View>
        </View>
      </TouchableOpacity>

      </View>

  )
}

}
