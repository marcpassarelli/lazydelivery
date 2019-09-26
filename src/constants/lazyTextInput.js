console.ignoredYellowBox = [
    'Setting a timer'
]
import { View, TextInput } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import React, { Component } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';

export default class LazyTextInput extends Component {

  render(){
  return (
        <View style={[this.props.style,{justifyContent: 'center',
          alignItems: 'center',flexDirection: 'row'}]}>
          <View style={{width: wp('14%'),height: hp('7%'),
            borderWidth: 0.5,borderColor: '#d1d1d1',
            alignItems: 'center',justifyContent: 'center'}}>
            <Icon
              name={this.props.nameIcon}
              size={wp('6.5%')}
              color={'#d1d1d1'} />
          </View>
            <TextInput
              {...this.props}
              ref={ref=> this.props.refInput = ref}
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              style={[styles.containerTextInput,{paddingLeft: 15,color: '#464949',
                marginHorizontal: 0,width: wp('63.30%'),borderWidth: 0.5,
                borderColor: '#d1d1d1',fontFamily: 'Futura-Book',fontSize: wp('3.5%'),backgroundColor: '#FFFFFF'}]}
              >
            </TextInput>
        </View>

)
}

}
