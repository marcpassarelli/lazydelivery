console.ignoredYellowBox = [
    'Setting a timer'
]
import React, { Component } from 'react';
import {
  Animated,
} from 'react-native';

export default class FadeInOutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),          // Initial value for opacity: 0
    };
  }
  componentDidMount() {
    Animated.sequence([            // decay, then spring to start and twirl
      Animated.timing(                            // Animate over time
        this.state.fadeAnim,                      // The animated value to drive
        {
          toValue: 1,
          duration: 2000,                             // Animate to opacity: 1, or fully opaque
        }
      ),
      Animated.timing(                            // Animate over time
        this.state.fadeAnim,                      // The animated value to drive
        {
          toValue: 0,
          duration: 2000,                             // Animate to opacity: 0, or fully transparent
        }
      )]).start();                       // Starts the animation*/
  }

  render() {
    return (
      <Animated.View                            // Special animatable View
        style={{
          ...this.props.style,
          opacity: this.state.fadeAnim,          // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
