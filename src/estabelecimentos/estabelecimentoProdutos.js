
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList, SectionList } from 'react-native'
import { styles } from '../constants/constants'
import * as firebase from 'firebase';
import {getEstabelecimentoProd, estabelecimentoProd, getEstabelecimentoTiposProd, estabelecimentoTiposProd, getEstabelecimentoProdutos} from '../firebase/database'
import EstabelecimentoProdutosListItem from './estabelecimentoProdutosListItem'

var sectionData=[]
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

callback(){
  if(this.state.nome)
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
    getEstabelecimentoTiposProd(nomeEstabelecimentoUp)
  }

}

componentDidMount(){


  this.setState({tiposProdutosUp: estabelecimentoTiposProd},
    this.callback,
    console.log("antes getEstabelecimentoProdutos"+this.state.tiposProdutosUp))


  getEstabelecimentoProdutos(this.state.nomeEstabelecimento, this.state.tiposProdutosUp)

  this.setState({produtosUp: estabelecimentoProd}, function(){
    this.callback
  })

  for(i=0; i<estabelecimentoTiposProd.length; i++){

    sectionData[i].push({
      data:this.state.produtosUp[i],
      title:this.state.tiposProdutosUp[i]
    })

  }

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

  <SectionList
    ItemSeparatorComponent={this.renderSeparator}
    sections={sectionData}
    renderItem={
      ({item}) =>
      <EstabelecimentoProdutosListItem
        nomeProduto = {sec}>

      </EstabelecimentoProdutosListItem>
    }
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

// <FlatList
//   ItemSeparatorComponent={this.renderSeparator}
//   data= {this.state.produtosUp}
//   extraData={this.state}
//   renderItem= {
//     ({item}) =>
//     <EstabelecimentoProdutosListItem
//       nomeProduto = {item.nomeProduto}
//       preco = {item.preco}
//       detalhes = {item.detalhes}
//       navigation={this.props.navigation}>
//     </EstabelecimentoProdutosListItem>}
//   keyExtractor={item => item._id}
//   />
