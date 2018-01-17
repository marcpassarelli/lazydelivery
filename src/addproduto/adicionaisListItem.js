import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles } from '../constants/constants'


export default class AdicionaisListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qtde:0
    }
  }

  menosQtde(){
    let qtde = this.state.qtde
    if(qtde!=0){
      this.setState({
        qtde: qtde - 1
      });
    }
  }

  maisQtde(){
    let qtde = this.state.qtde + 1
    this.setState({
      qtde: qtde
    });
  }

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    return (
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
        <View style={{flex:1}}>
          <Text style={[styles.textAddProduto, {alignSelf: 'center', marginHorizontal: 10}]}>
            {this.props.nomeAdicional}
          </Text>
        </View>
        <View style={{flex:1}}>
          <Text style={[styles.textAddProduto, {alignSelf: 'center'}]}>
            R$ {this.props.preco*this.state.qtde}
          </Text>
        </View>
        <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10}}>
        <TouchableOpacity style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}} onPress={()=>{this.menosQtde()}}>
          <Image source={require('../../img/minus.png')} style={styles.icon}/>
        </TouchableOpacity>
        <Text style={[styles.textAddProduto, {alignSelf: 'center', justifyContent: 'center', marginHorizontal: 10, fontSize: 16, lineHeight: 16}]}>{this.state.qtde}</Text>
        <TouchableOpacity style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}onPress={()=>{this.maisQtde()}}>
          <Image source={require('../../img/plus.png')} style={styles.icon}/>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
