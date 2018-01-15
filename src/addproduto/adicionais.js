
import React, { Component } from 'react';
import { Image, Alert, View, Text,TextInput, Button, ActivityIndicator, TouchableOpacity, FlatList, Icon, Dimensions, Picker } from 'react-native'
import { styles, cores } from '../constants/constants'
import {listaAdicionais, listaEstabelecimentos} from '../firebase/database'

import _ from 'lodash'

export class AdicionaisScreen extends Component{

  static navigationOptions = ({navigation}) => ({
    title: "Adicionais",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>)
  });

  constructor(props){
    super(props);
    this.state = {

    }

  }

  componentWillMount(){


  }

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    const content = this.state.loading ?

    <View style={styles.containerIndicator}>
      <ActivityIndicator
        color = '#8b0000'
        size="large"
        style = {styles.activityIndicator}/>
    </View> :

    <View style={{flex: 1}}>

    </View>

    return (
      <Image
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        {content}
      </Image>
    );
  }
}
