console.ignoredYellowBox = [
    'Setting a timer'
]
import { View } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import React, { Component } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class ListItemSeparator extends Component {

  render(){
  return (
    <View
      style={{
        height: 3,
        backgroundColor: cores.corSecundaria,
        marginHorizontal: 15,
        marginBottom:hp('0.77%')
      }}
    />

)
}

}
