import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles } from '../constants/constants'


export default class CarrinhoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty:1
    }
  }

  componentWillMount(){

  }
  minusQty(){
    let qty = this.state.qty
    if(qty>0){
      this.setState({
        qty: qty - 1
      });
    }
  }

  plusQty(){
    let qty = this.state.qty + 1
    this.setState({
      qty: qty
    });
  }

  render() {
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
          <View style={{flex:1}}>
            <Text style={[styles.textAdicionais, {alignSelf: 'center', marginHorizontal: 10}]}>
              {item.nomeProd}
            </Text>
          </View>
          <View style={{flex:1}}>
            <Text style={[styles.textAdicionais, {alignSelf: 'center'}]}>
              R$ {item.preco*item.qtde}
            </Text>
          </View>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10}}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}
              onPress={()=>{this.props.minusQty()}}>
              <Image
                source={require('../../img/minus.png')}
                style={styles.icon}/>
            </TouchableOpacity>
            <Text
              style={[styles.textAdicionais, {alignSelf: 'center', justifyContent: 'center', marginHorizontal: 10, fontSize: 16, lineHeight: 16}]}>
              {item.qtde}
            </Text>
            <TouchableOpacity
              style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}
              onPress={()=>{this.props.plusQty()}}>
              <Image
                source={require('../../img/plus.png')}
                style={styles.icon}/>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text>{this.props.obs}</Text>
        </View>
      </View>
    );
  }
}
