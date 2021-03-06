
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity, ListView } from 'react-native'
import { styles, images} from '../constants/constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import _ from 'lodash'

export default class HomeListItem extends Component {

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    return (
      <TouchableOpacity
        style={[styles.containerListItem,{height: hp('11%')}]}
        onPress = {() => {
          console.log("this.props.tipoEstabelecimento"+this.props.tipoEstabelecimento);
          this.props.navigation.push(
            'ListaEstabelecimentos',
            {tipoEstabelecimento: this.props.tipoEstabelecimento,
            bairro:this.props.bairro})
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
