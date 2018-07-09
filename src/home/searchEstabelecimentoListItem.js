import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, ListView } from 'react-native'
import { styles } from '../constants/constants'
import * as firebase from 'firebase';
import { getEstabelecimentoProd, } from '../firebase/database'

import _ from 'lodash'

export default class SearchEstabelecimentoListItem extends Component {

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    return (
      <TouchableOpacity
        style={styles.containerSearchListItem}
        onPress = {() => {
          this.props.navigation.navigate('Estabelecimento',{nomeEstabelecimento: this.props.estabelecimento, telaAnterior:"home"})
        }}>
        <Image
          source={{uri:this.props.imglogo}}
          style={styles.imagemListSearch}
          />
        <View>
          <Text
            style={styles.textTipoEstabelecimento}>{this.props.estabelecimento}</Text>
        </View>
      </TouchableOpacity>

  )
}

}
