
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList, Icon } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import ListaEstabelecimentosListItem from './listaEstabelecimentosListItem'
import {getListaEstabelecimentos, listaEstabelecimentos} from '../firebase/database'

import _ from 'lodash'

export class ListaEstabelecimentosScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.tipoEstabelecimento,
    headerTitleStyle: { color: cores.corPrincipal, textAlign: 'center', alignSelf:'center' },
    headerRight: (<View></View>)
  });

constructor(props){
  super(props);
  this.state = {
    tipoEstabelecimento:'',
    listaEstabelecimentosUp:'',
    loading: false,

  }
}

renderSeparator = () => {
 return (
   <View
     style={{
       height: 1,
       width: "100%",
       backgroundColor: "#CED0CE",
       marginLeft: 5,
       marginBottom: 7
     }}
   />
 );
};

validateUserName(){
  console.log("setState:"+this.state.tipoEstabelecimento)
  return this.state.tipoEstabelecimento+""
}


componentWillMount(){
  this.setState({
          loading: true
        });

  const {state} = this.props.navigation;
  var tipoEstabelecimentoUp = state.params ? state.params.tipoEstabelecimento : ""

  if(tipoEstabelecimentoUp){
  this.setState({tipoEstabelecimento: tipoEstabelecimentoUp}, function(){
    this.validateUserName()

  })
  }

}

componentDidMount(){

  console.log("antes getEstabelecimentos"+this.state.tipoEstabelecimento)

  getListaEstabelecimentos(this.state.tipoEstabelecimento)
  this.setState({listaEstabelecimentosUp: listaEstabelecimentos}, function(){
    this.validateUserName()
  })
  if(listaEstabelecimentos){
  this.setState({
          loading: false
        });
    }

}

render() {
  console.ignoredYellowBox = [
    'Setting a timer'
  ]
  const { goBack } = this.props.navigation;
  const content = this.state.loading ?

  <View style={styles.containerIndicator}>
    <ActivityIndicator
      color = '#8b0000'
      size="large"
      style = {styles.activityIndicator}/>
  </View> :

  <View style={{flex:1}}>

  <FlatList
    ItemSeparatorComponent={this.renderSeparator}
    data= {this.state.listaEstabelecimentosUp}
    extraData={this.state}
    renderItem= {
      ({item}) =>
      <ListaEstabelecimentosListItem
        estabelecimento = {item.nome}
        imglogoEstabelecimento = {item.logo}
        valorDelivery = {item.precoDelivery}
        tempoEntrega = {item.tempoEntrega}
        navigation={this.props.navigation}>
      </ListaEstabelecimentosListItem>}
    keyExtractor={item => item._id}
    />
  </View>

  return (

    <Image
      source={require('../../img/alimentos-fundo2.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.separator}></View>
      {content}
    </Image>
);
}
}
