import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles } from '../constants/constants'


export default class ResumoPgtoListItem extends Component {
  constructor(props) {
    super(props);

  }

  functionCarrinhoListItem=(item)=>{
    if(item.adicional==false){
      return (
        <View>
          <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
            <View style={{width: 200}}>
              <Text style={[styles.textCarrinho,
                  {alignSelf: 'flex-start',
                  marginHorizontal: 10}]}>
              {item.quantidade}x {item.nome}
              </Text>
            </View>
            <View style={{flex:1}}>
              <Text style={[styles.textCarrinho, {alignSelf: 'flex-end', marginRight: 15}]}>
                R$ {item.preco*item.quantidade}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{color:'#666666', marginLeft: 15, fontSize: 15}}>{item.obs}</Text>
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
                  {alignSelf: 'flex-start', marginHorizontal: 10, fontSize: 12}]}>
                {item.quantidade}x {item.nome}
              </Text>
            </View>
            <View style={{flex:1}}>
              <Text style={[styles.textCarrinhoAdicionais, {alignSelf: 'center', fontSize: 12, marginRight: 5}]}>
                R$ {item.preco*item.quantidade}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{color:'#666666', marginLeft: 15, fontSize: 15}}>{item.obs}</Text>
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
