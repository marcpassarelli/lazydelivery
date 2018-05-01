import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles } from '../constants/constants'


export default class CarrinhoListItem extends Component {
  constructor(props) {
    super(props);

  }

  functionObservacao(item){
    if(item){
      return(<Text style={{color:'#666666', marginLeft: 20, fontSize: 12}}>Observação: {item}</Text>)
    }else{
      return(<Text></Text>)
    }
  }



  functionCarrinhoListItem=(item)=>{
    console.log("obs"+item.obs);
    if(item.adicional==false){
      return (
        <View>
          <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
            <View style={{width: 200}}>
              <Text style={[styles.textCarrinho,
                  {alignSelf: 'flex-start',
                  marginHorizontal: 10}]}>
                {item.nome}
              </Text>
            </View>
            <View style={{flex:1}}>
              <Text style={[styles.textCarrinho, {alignSelf: 'center'}]}>
                R$ {item.preco*item.quantidade}
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
                <Image
                  source={require('../../img/minus.png')}
                  style={styles.icon}/>
              </TouchableOpacity>
              <Text
                style={[styles.textCarrinho,
                  {alignSelf: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 10,
                  fontSize: 16,
                  lineHeight: 16}]}>
                {item.quantidade}
              </Text>
              <TouchableOpacity
                style={{justifyContent: 'center', alignSelf: 'center'}}
                onPress={()=>{this.props.onAdd()}}>
                <Image
                  source={require('../../img/plus.png')}
                  style={styles.icon}/>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {this.functionObservacao(item.obs)}
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
                {item.nome}
              </Text>
            </View>
            <View style={{flex:1}}>
              <Text style={[styles.textCarrinhoAdicionais, {alignSelf: 'center'}]}>
                R$ {item.preco*item.quantidade}
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
                <Image
                  source={require('../../img/minus.png')}
                  style={styles.icon}/>
              </TouchableOpacity>
              <Text
                style={[styles.textCarrinhoAdicionais,
                  {alignSelf: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 10,
                  lineHeight: 16}]}>
                {item.quantidade}
              </Text>
              <TouchableOpacity
                style={{justifyContent: 'center', alignSelf: 'center'}}
                onPress={()=>{this.props.onAdd()}}>
                <Image
                  source={require('../../img/plus.png')}
                  style={styles.icon}/>
              </TouchableOpacity>
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
