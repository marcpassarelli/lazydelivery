import React, { Component } from 'react';
import { styles, cores } from '../constants/constants'
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text
} from 'react-native';

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={stylesLocal.modalBackground}>
        <View style={stylesLocal.activityIndicatorWrapper}>
          <Text style={{marginHorizontal: 10}}>Aguardando confirmação que o pedido foi recebido...</Text>
          <ActivityIndicator
            style = {styles.activityIndicator}
            animating={loading} />
        </View>
      </View>
    </Modal>
  )
}

const stylesLocal = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#8b000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;
