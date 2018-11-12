import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, ListView } from 'react-native'
import { styles, images} from '../constants/constants'
import { getEstabelecimentoProd, } from '../firebase/database'

import _ from 'lodash'

export default class SearchEstabelecimentoListItem extends Component {

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    return (
      <TouchableOpacity
        style={[styles.containerSearchListItem,{marginBottom:5}]}
        onPress = {() => {
          this.props.navigation.navigate('Estabelecimento',
          {nomeEstabelecimento: this.props.estabelecimento,
           tipoEstabelecimento: this.props.tipoEstabelecimento, telaAnterior:"home"})
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
