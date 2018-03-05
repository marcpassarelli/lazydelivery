
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, ListView } from 'react-native'
import { styles } from '../constants/constants'
import * as firebase from 'firebase';
import { getListaEstabelecimentos } from '../firebase/database'

import _ from 'lodash'

export default class HomeListItem extends Component {

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    return (
      <TouchableOpacity
        style={styles.containerListItem}
        onPress = {() => {
          this.props.loadingTrue,
          getListaEstabelecimentos(this.props.tipoEstabelecimento),
          this.props.navigation.navigate('ListaEstabelecimentos',{tipoEstabelecimento: this.props.tipoEstabelecimento}),
          this.props.loadingFalse
        }}>
        <Image
          source={this.props.imglogo}
          style={styles.imagemTipoEstabelecimento}
          />
        <View>
          <Text
            style={styles.textTipoEstabelecimento}>{this.props.tipoEstabelecimento}</Text>
        </View>
      </TouchableOpacity>

  )
}

}
