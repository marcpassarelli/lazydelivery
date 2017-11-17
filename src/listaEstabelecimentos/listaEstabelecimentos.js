
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList } from 'react-native'
import { styles } from '../constants/constants'
import * as firebase from 'firebase';
import EstabelecimentosListItem from './estabelecimentosListItem'
import {infoEstabelecimentos} from './infoEstabelecimentos'
import {getEstabelecimentos, estabelecimentos} from '../firebase/database'

import _ from 'lodash'

export class EstabelecimentosScreen extends Component{


  static navigationOptions = {
    header: null,
  }
constructor(props){
  super(props);
  this.state = {
    tipoEstabelecimento:'',
    estabelecimentosUp:'',
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

  getEstabelecimentos(this.state.tipoEstabelecimento)
  this.setState({estabelecimentosUp: estabelecimentos}, function(){
    this.validateUserName()
  })
  if(estabelecimentos){
  this.setState({
          loading: false
        });
    }
  console.log("estabelecimentos"+JSON.stringify(this.state.estabelecimentosUp.logo))

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

  <View style={{flex:1}}>
  <View>
    <Text style={styles.nomeAppHome}>{this.state.tipoEstabelecimento}</Text>
  </View>

  <FlatList
    ItemSeparatorComponent={this.renderSeparator}
    data= {this.state.estabelecimentosUp}
    extraData={this.state}
    renderItem= {
      ({item}) =>
      <EstabelecimentosListItem
        estabelecimento = {item.nome}
        imglogoEstabelecimento = {item.logo}
        valorDelivery = {item.precoDelivery}
        tempoEntrega = {item.tempoEntrega}
        navigation={this.props.navigation}>
      </EstabelecimentosListItem>}
    keyExtractor={item => item._id}
    />
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
