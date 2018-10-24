console.ignoredYellowBox = [
    'Setting a timer'
]
import { View, TouchableHighlight, Image, Text } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import React, { Component } from 'react';

export default class LazyBackButton extends Component {

  render(){
  return (
    <View style={{flexDirection: 'row',alignItems: 'center'}}>
      <TouchableHighlight onPress={()=>{this.props.goBack()}}
        style={{width: 30,height: 30,marginLeft: 10,
          marginTop:3,alignSelf: 'center',justifyContent: 'center'}}>
        <Image
          style={{width: 30,height: 30}}
          source={images.seta2}>
        </Image>
      </TouchableHighlight>
      <Text style={{marginTop:5,justifyContent: 'center',alignSelf: 'center',fontSize:18 ,fontFamily: 'Futura Medium Italic BT',color: 'white'}}> Voltar </Text>
    </View>

)
}

}
