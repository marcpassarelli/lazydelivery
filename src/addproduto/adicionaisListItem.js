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


  render() {
    const { item } = this.props;

    return (
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
        <View style={{flex:1}}>
          <Text style={[styles.textAdicionais, {alignSelf: 'center', marginHorizontal: 10}]}>
            {item.nome}
          </Text>
        </View>
        <View style={{flex:1}}>
          {this.props.preco()}
        </View>
        <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10}}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}
            onPress={this.props.onSubtract}>
            <Image
              source={require('../../img/minus.png')}
              style={styles.icon}/>
          </TouchableOpacity>
          <Text
            style={[styles.textAdicionais, {alignSelf: 'center', justifyContent: 'center', marginHorizontal: 10, fontSize: 16, lineHeight: 16}]}>
            {item.quantidade}
          </Text>
          <TouchableOpacity
            style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}
            onPress={this.props.onAdd}>
            <Image
              source={require('../../img/plus.png')}
              style={styles.icon}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
