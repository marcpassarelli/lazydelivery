
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList } from 'react-native'
import { styles } from '../constants/constants'
import * as firebase from 'firebase';
import {getEstabelecimentoProd, estabelecimentoProd} from '../firebase/database'

import _ from 'lodash'

export class EstabelecimentoProdutosScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.nomeEstabelecimento,
    headerTitleStyle: { color: cores.corPrincipal, textAlign: 'center', alignSelf:'center', fontSize:24 },
    headerRight: (<View></View>)
  });

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

  if(nomeEstabelecimentoUp){
  this.setState({nomeEstabelecimento: nomeEstabelecimentoUp}, function(){
    this.validateUserName()

  })
  }

}

componentDidMount(){

  console.log("antes getEstabelecimentos"+this.state.tipoEstabelecimento)

  getEstabelecimentoProd(this.state.nomeEstabelecimento)
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
        imgProduto = {item.imgProduto}
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
