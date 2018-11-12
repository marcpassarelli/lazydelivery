import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles, images} from '../constants/constants'


export default class ResumoCarrinhoListItem extends Component {
  constructor(props) {
    super(props);

  }

  functionObservacao=(item)=>{
    if(item.obs){
      return(
        <Text>Observação:{item.obs}</Text>
      )
    }else{
      <Text></Text>
    }

  }

  functionCarrinhoListItem=(item)=>{
    if(item.adicional==false){
      return (
        <View>
          <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
            <View style={{width: 200}}>
              <Text style={[styles.textCarrinho,
                  {alignSelf: 'flex-start',
                  marginHorizontal: 10,
                fontSize: wp('3.25%')}]}>
              {item.quantidade}x {item.nome}
              </Text>
            </View>
            <View style={{flex:1}}>
              {this.props.preco()}
            </View>
          </View>
          <View>
            <Text style={{color:'#666666', marginLeft: 15, fontSize: wp('3%')}}>{this.functionObservacao(item)}</Text>
          </View>
        </View>
      );
    }else{
      return (
        <View style={{marginLeft:20}}>
          <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
            <View style={{width: 180}}>
              <Text
                style={[styles.textCarrinhoAdicionais,
                  {alignSelf: 'flex-start', marginHorizontal: 10, fontSize: 11}]}>
                {item.quantidade}x {item.nome}
              </Text>
            </View>
            <View style={{flex:1}}>
              <Text style={[styles.textCarrinhoAdicionais, {alignSelf: 'flex-end', fontSize: 11, marginRight: 18}]}>
                R$ {item.preco*item.quantidade}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }

  render() {
    const { item } = this.props;
    return(
      <View>
        {this.functionCarrinhoListItem(item)}
      </View>
    )
  }
}
