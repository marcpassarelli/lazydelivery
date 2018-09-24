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
            <Text style={{marginHorizontal: 10,fontFamily: 'Futura Book'}}>{this.props.message}</Text>
            <Animated.Image source={images.iconSplash}
              style={[this.props.animatedStyle,{
              width: 40, height: 40}]}>
            </Animated.Image>
          </View>
        </View>
      </Modal>
    )
  }

}
// const Loader = props => {
//   const {
//     loading,
//     message,
//     animatedStyle,
//     ...attributes
//   } = props;
//
//   return (
//
//   )
// }
// <ActivityIndicator
//   style = {styles.activityIndicator}
//   animating={loading} />

// <Animated.Image
//   source={images.iconSplash}
//   style={[this.props.animatedStyle,{
//   width: 40, height: 40
//   }]}>
// </Animated.Image>

const stylesLocal = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,131,139,0.9)'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  box: {
  width: 100,
  height: 100,
  backgroundColor: '#333',
  alignItems: "center",
  justifyContent: "center"
},
text: {
  color: "#FFF"
}
});
//
// export default Loader;
