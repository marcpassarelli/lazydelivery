console.ignoredYellowBox = [
    'Setting a timer'
]
import { View } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import React, { Component } from 'react';

export default class ListItemSeparator extends Component {

  render(){
  return (
    <View
      style={{
        height: 3,
        backgroundColor: cores.corSecundaria,
        marginHorizontal: 15,
        marginBottom: 7
      }}
    />

)
}

}
