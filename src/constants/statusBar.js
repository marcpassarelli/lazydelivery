
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform
} from 'react-native';

export default class StatusBar extends Component {
  render() {
    return (
      <View style={[styles.statusBarBackground]}></View>
    );
  }
}

const styles= StyleSheet.create({
  statusBarBackground:{
    height: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: 'transparent'
  }
})
