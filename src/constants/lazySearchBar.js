console.ignoredYellowBox = [
    'Setting a timer'
]
import { View, TextInput,Platform,TouchableOpacity } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import React, { Component } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';

export default class LazySearchBar extends Component {

  render(){
  return (
        <View style={[this.props.style,{justifyContent: 'center',alignItems: 'center',flexDirection: 'row'}]}>
          <View style={{width: wp('14%'),height: hp('7%'),borderWidth: 0.5,
            borderColor: '#d1d1d1',alignItems: 'center',justifyContent: 'center'}}>
            <Icon
              name={'search'}
              size={wp('6.5%')}
              color={'#d1d1d1'} />
          </View>
            <TextInput
              {...this.props}
              clearButtonMode="always"
              underlineColorAndroid='transparent'
              style={[styles.containerTextInput,{paddingLeft: 15,color: '#464949',
                marginHorizontal: 0,width: wp('63.30%'),borderWidth: 0.5,borderColor: '#d1d1d1',
                fontFamily: 'Futura Book',
                fontSize: wp('3.5%'),backgroundColor: '#d1d1d1'}]}
              >
            </TextInput>
            {Platform.OS === 'ios' ?
              <View></View> :
              <View style={{width: wp('14%'),height: hp('7%'),borderWidth: 0.5,
                backgroundColor: '#d1d1d1',
                  borderColor: '#d1d1d1',alignItems: 'center',justifyContent: 'center'}}>
              <TouchableOpacity onPress={()=>{this.props.clearText()}}>
              <Icon
                name='x'
                backgroundColor='#d1d1d1'
                size={wp('6.5%')}
                color={'#111111'}/>
              </TouchableOpacity>
              </View>
            }

        </View>

)
}

}
