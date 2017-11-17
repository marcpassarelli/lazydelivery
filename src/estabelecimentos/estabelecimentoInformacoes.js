console.ignoredYellowBox = [
    'Setting a timer'
]

import React, { Component } from 'react';
import { Image, Alert, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles } from '../constants/constants'
import { logout, checkUserDetails, getUserDetails } from '../firebase/database'
import * as firebase from 'firebase';



export class EstabelecimentoInformacoesScreen extends Component {

  static navigationOptions = {
    header: null,
    tabBarLabel: 'Informações',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../img/shop-building.png')}
        style={[styles.icon, {tintColor: tintColor}]}
        />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,

    };
  }


   render() {

     let imageProfile = {
       uri: this.state.profilePicURL ? this.state.profilePicURL : 'require(../../img/makefg.png)'
     }

     const content = this.state.loading ?

     <View style={styles.containerIndicator}>
       <ActivityIndicator
         color = '#8b0000'
         size="large"
         style = {styles.activityIndicator}/>
     </View> :

     <View style={{flex:1}}>
       <Image
         style={styles.imagemTipoEstabelecimento}
         source={{uri:imageProfile.uri}}/>

       <Text style={styles.textProfileDetails}>Taxa Delivery: {this.state.nome} </Text>
       <Text style={styles.textProfileDetails}>Tempo Estimado de Entrega: {this.state.telefone} </Text>

       <Text style={styles.textProfileDetails}>Horários de Funcionamento</Text>
       <Text style={styles.textProfileDetails}>Segunda-Feira: {this.props.segunda.abertura} às {this.props.segunda.fechamento}</Text>
       <Text style={styles.textProfileDetails}>Terça-Feira: {this.props.terca.abertura} às {this.props.terca.fechamento}</Text>
       <Text style={styles.textProfileDetails}>Quarta-Feira: {this.props.quarta.abertura} às {this.props.quarta.fechamento}</Text>
       <Text style={styles.textProfileDetails}>Quinta-Feira: {this.props.quinta.abertura} às {this.props.quinta.fechamento}</Text>
       <Text style={styles.textProfileDetails}>Sexta-Feira: {this.props.sexta.abertura} às {this.props.sexta.fechamento}</Text>
       <Text style={styles.textProfileDetails}>Sábado: {this.props.sabado.abertura} às {this.props.sabado.fechamento}</Text>
       <Text style={styles.textProfileDetails}>Domingo: {this.props.domingo.abertura} às {this.props.domingo.fechamento}</Text>

       <Text>Formas de Pagamento</Text>

       <View style={styles.separator}></View>

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

//export default Home
