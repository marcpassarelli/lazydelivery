import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, ListView } from 'react-native'
import { styles } from '../constants/constants'
import * as firebase from 'firebase';
import { getListaEstabelecimentos } from '../firebase/database'

import _ from 'lodash'

export default class SearchEstabelecimentoListItem extends Component {

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    return (
      <TouchableOpacity
        style={styles.containerListItem}
        onPress = {() => {
          getEstabelecimentoProd(this.props.estabelecimento),
          this.props.navigation.navigate('Estabelecimento',{nomeEstabelecimento: this.props.estabelecimento})
        }}>
        <View>
          <Text
            style={styles.textTipoEstabelecimento}>{this.props.estabelecimento}</Text>
        </View>
      </TouchableOpacity>

  )
}

}
// <Image
//   source={this.props.imglogo}
//   style={styles.imagemTipoEstabelecimento}
//   />
