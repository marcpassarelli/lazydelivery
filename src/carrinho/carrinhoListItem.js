import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles, images} from '../constants/constants'
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class CarrinhoListItem extends Component {
  constructor(props) {
    super(props);

  }

  functionObservacao(tipoProduto, obs, detalhes){
    if(tipoProduto=="Pizzas"){
      if(detalhes&&obs){
        return(
          <View>
            <Text style={{flex:1, color:'#666666', fontSize: 12}}>{detalhes}</Text>
            <Text style={{flex:1, color:'#666666', fontSize: 12}}>Observação: {obs}</Text>
          </View>
        )
      }else if(detalhes){
        return(
          <Text style={{flex:1, color:'#666666', fontSize: 12}}>{detalhes}</Text>)
      }else if(obs){
        return(
          <Text style={{flex:1, color:'#666666', fontSize: 12}}>Observação: {obs}</Text>)
      }else{
        return(<Text></Text>)
      }
    }
  }



  functionCarrinhoListItem=(item)=>{
    if(item.adicional==false){
      return (
        <View style={{height:60, flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
            <View style={{width:wp('37%'), justifyContent: 'center',marginLeft: 10}}>
              <Text style={styles.textCarrinho}>
                {item.nome}
              </Text>
              {this.functionObservacao(item.tipoProduto,item.obs, item.detalhes)}
            </View>

            <View style={{flex:1}}>
              {this.props.preco()}
            </View>

            <View style={
                {width:wp('12%'),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems:'center',
                marginRight: 10}}>
              <TouchableOpacity
                onPress={()=>{this.props.onSubtract()}}>
                <Icon
                  name={'minus-circle'}
                  size={23}
                  color={'rgb(43, 189, 204)'}/>
              </TouchableOpacity>
              <Text
                style={[styles.textCarrinho,
                  {alignSelf: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 10,
                  fontSize: 16}]}>
                {item.quantidade}
              </Text>
              <TouchableOpacity
                style={{justifyContent: 'center', alignSelf: 'center'}}
                onPress={()=>{this.props.onAdd()}}>
                <Icon
                  name={'plus-circle'}
                  size={23}
                  color={'rgb(43, 189, 204)'}/>
              </TouchableOpacity>
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
                  {alignSelf: 'flex-start', marginHorizontal: 10}]}>
                {item.nome} (adicional)
              </Text>
            </View>
            <View style={{flex:1}}>
              <Text style={[styles.textCarrinhoAdicionais, {alignSelf: 'center'}]}>
                R$ {(item.preco*item.quantidade).toFixed(2)}
              </Text>
            </View>
            <View style={
                {flex:1,
                 flexDirection: 'row',
                 justifyContent: 'flex-end',
                 marginRight: 10}}>
              <TouchableOpacity
                style={{justifyContent: 'center', alignSelf: 'center'}}
                onPress={()=>{this.props.onSubtract()}}>
                <Icon
                  name={'minus-circle'}
                  size={23}
                  color={'rgb(43, 189, 204)'}/>
              </TouchableOpacity>
              <Text
                style={[styles.textCarrinhoAdicionais,
                  {alignSelf: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 10,
                  lineHeight: 16}]}>
                {item.quantidade}
              </Text>
              {item.tipoProduto=="Pizzas" ?
                <View style={{justifyContent: 'center', alignSelf: 'center'}}></View>
                :
                <TouchableOpacity
                  style={{justifyContent: 'center', alignSelf: 'center'}}
                  onPress={()=>{this.props.onAdd()}}>
                  <Icon
                    name={'plus-circle'}
                    size={23}
                    color={'rgb(43, 189, 204)'}/>
                </TouchableOpacity>
              }
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
