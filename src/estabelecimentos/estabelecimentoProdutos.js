
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList } from 'react-native'
import { styles } from '../constants/constants'
import * as firebase from 'firebase';
import {getEstabelecimentoInfo, estabelecimentoInfo} from '../firebase/database'

import _ from 'lodash'

export class EstabelecimentoProdutosScreen extends Component{


  static navigationOptions = {
    header: null,
    tabBarLabel: 'Produtos',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../img/shop-building.png')}
        style={[styles.icon, {tintColor: tintColor}]}
        />
    ),
  };

constructor(props){
  super(props);
  this.state = {
    nomeEstabelecimento:'',
    estabelecimentoUp:'',
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
  var nomeEstabelecimentoUp = state.params ? state.params.nomeEstabelecimento : ""

  if(tipoEstabelecimentoUp){
  this.setState({nomeEstabelecimento: nomeEstabelecimentoUp}, function(){
    this.validateUserName()

  })
  }

}

componentDidMount(){

  console.log("antes getEstabelecimentos"+this.state.tipoEstabelecimento)

  getEstabelecimentos(this.state.nomeEstabelecimento)
  this.setState({estabelecimentoUp: estabelecimentoInfo}, function(){
    this.validateUserName()
  })
  if(estabelecimentoInfo){
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
    data= {this.state.estabelecimentoUp}
    extraData={this.state}
    renderItem= {
      ({item}) =>
      <EstabelecimentoProdutosListItem
        estabelecimento = {item.nome}
        imglogoEstabelecimento = {item.logo}
        valorDelivery = {item.precoDelivery}
        tempoEntrega = {item.tempoEntrega}
        navigation={this.props.navigation}>
      </EstabelecimentoProdutosListItem>}
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
