import React, { Component } from 'react';
import { styles, cores, images} from '../constants/constants'
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Animated,
  Text
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import LazyActivity from './lazyActivity'

export default class Loader extends Component{
  render(){
    return(
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.props.loading}
        onRequestClose={() => {console.log('close modal')}}>
        <View style={stylesLocal.modalBackground}>
          <View style={stylesLocal.activityIndicatorWrapper}>
            <Text style={{marginHorizontal: 5,fontFamily: 'Futura-Book',textAlign: 'center',marginBottom: 5}}>{this.props.message}</Text>
            <LazyActivity/>
          </View>
        </View>
      </Modal>
    )
  }

}

const stylesLocal = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,131,139,0.8)'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: hp('35%'),
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
text: {
  color: "#FFF"
}
});
//
// export default Loader;
