
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList, SectionList } from 'react-native'
import { styles } from '../constants/constants'
import * as firebase from 'firebase';
import {getEstabelecimentoProd, estabelecimentoProd, getEstabelecimentoTiposProd, estabelecimentoTiposProd} from '../firebase/database'
import EstabelecimentoProdutosListItem from './estabelecimentoProdutosListItem'

import _ from 'lodash'

export class EstabelecimentoProdutosScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.nomeEstabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>),
    tabBarLabel: 'Cardápio',
  });

constructor(props){
  super(props);
  this.state = {
    nomeEstabelecimento:'',
    produtosUp:'',
    tiposProdutosUp:'',
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

  if(nomeEstabelecimentoUp){
  this.setState({nomeEstabelecimento: nomeEstabelecimentoUp}, function(){
    this.validateUserName()

  })
  }

}

componentDidMount(){

  console.log("antes getEstabelecimentos"+this.state.tipoEstabelecimento)

  // getEstabelecimentoTiposProd(this.state.nomeEstabelecimento)

  getEstabelecimentoProd(this.state.nomeEstabelecimento)

  this.setState({produtosUp: estabelecimentoProd}, function(){
    this.validateUserName()
  })
  //
  // this.setState({tiposProdutosUp: estabelecimentoTiposProd}, function(){
  //   this.validateUserName()
  // })

  if(estabelecimentoProd){
  this.setState({
          loading: false
        });
    }
  console.log("estabelecimentos"+JSON.stringify(this.state.estabelecimentosUp))

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
    data= {this.state.produtosUp}
    extraData={this.state}
    renderItem= {
      ({item}) =>
      <EstabelecimentoProdutosListItem
        nomeProduto = {item.nomeProduto}
        preco = {item.preco}
        detalhes = {item.detalhes}
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
