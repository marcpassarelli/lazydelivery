console.ignoredYellowBox = [
    'Setting a timer'
]
import { View, TouchableHighlight, Text } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import React, { Component } from 'react';

export default class LazyYellowButton extends Component {

  render(){
  return (
        <View style={this.props.style}>
          <TouchableHighlight
            style={[styles.buttons]}
            onPress = { () => {this.props.onPress()} }>
            <Text style={styles.textButtons}>{this.props.text}</Text>
          </TouchableHighlight>
        </View>

)
}

}
