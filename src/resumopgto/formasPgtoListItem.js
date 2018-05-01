import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles } from '../constants/constants'


export default class FormasPgtoListItem extends Component {
  constructor(props) {
    super(props);

  }

  functionFormasPgtoListItem=(item)=>{
      return (
        <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
          <View style={{width: 200}}>
            <Text style={[styles.textCarrinho,
                {alignSelf: 'flex-start',
                marginHorizontal: 10}]}>
            {item.tipoPgto}
            </Text>
          </View>
        </View>
      );
  }

  render() {
    const { item } = this.props;
    return(
      <View>
        {this.functionFormasPgtoListItem(item)}
      </View>
    )
  }
}
