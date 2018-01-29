import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles } from '../constants/constants'


export default class AdicionaisListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty:0
    }
  }

  minusQty(){
    let qty = this.state.qty
    if(qty!=0){
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
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
        <View style={{flex:1}}>
          <Text style={[styles.textAdicionais, {alignSelf: 'center', marginHorizontal: 10}]}>
            {this.props.nomeAdicional}
          </Text>
        </View>
        <View style={{flex:1}}>
          <Text style={[styles.textAdicionais, {alignSelf: 'center'}]}>
            R$ {this.props.preco*this.state.qty}
          </Text>
        </View>
        <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10}}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}
            onPress={()=>{this.minusQty()}}>
            <Image
              source={require('../../img/minus.png')}
              style={styles.icon}/>
          </TouchableOpacity>
          <Text
            style={[styles.textAdicionais, {alignSelf: 'center', justifyContent: 'center', marginHorizontal: 10, fontSize: 16, lineHeight: 16}]}>
            {this.state.qty}
          </Text>
          <TouchableOpacity
            style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}
            onPress={()=>{this.plusQty()}}>
            <Image
              source={require('../../img/plus.png')}
              style={styles.icon}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
