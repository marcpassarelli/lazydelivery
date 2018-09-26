import React, { Component } from 'react';
import { styles, cores, images} from '../constants/constants'
import {
  StyleSheet,
  Animated,
  Easing
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class LazyActivity extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),          // Initial value for opacity: 0
    };
  }

  componentDidMount(){
    this.runAnimation()
  }

  runAnimation() {
    this.state.fadeAnim.setValue(-3);
    Animated.timing(this.state.fadeAnim, {
      toValue: -1,
      duration: 3000,
      easing:Easing.linear
    }).start(() => this.runAnimation());
  }

  render(){
    const interpolateRotation = this.state.fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })
    const animatedStyle = {
      transform: [
        { rotate: interpolateRotation }
      ]
    }
    return(
        <Animated.Image source={images.iconSplash}
          style={[animatedStyle,{
          width: 35, height: 35}]}>
        </Animated.Image>
    )
  }

}
