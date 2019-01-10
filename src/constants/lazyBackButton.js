console.ignoredYellowBox = [
    'Setting a timer'
]
import { View, TouchableHighlight, Image, Text } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import React, { Component } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class LazyBackButton extends Component {

  render(){
  return (
    <View style={{flexDirection: 'row',alignItems: 'center'}}>
      <TouchableHighlight onPress={()=>{this.props.goBack()}}
        style={{width: 30,height: 30,marginLeft: 10,
          marginTop:hp('0.33%'),alignSelf: 'center',justifyContent: 'center'}}>
        <Image
          style={{width: 30,height: 30}}
          source={images.seta2}>
        </Image>
      </TouchableHighlight>
      <Text style={{marginTop:hp('0.55%'),justifyContent: 'center',
        alignSelf: 'center',fontSize:wp('2.5%') ,
        fontFamily: 'FuturaBT-MediumItalic',color: 'white'}}> VOLTAR </Text>
    </View>

)
}

}
