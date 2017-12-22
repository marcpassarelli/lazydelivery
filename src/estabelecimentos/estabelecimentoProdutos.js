
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList, SectionList } from 'react-native'
import { styles } from '../constants/constants'
import * as firebase from 'firebase';
import {getEstabelecimentoProd, estabelecimentoProd, getEstabelecimentoTiposProd, estabelecimentoTiposProd, getEstabelecimentoProdutos} from '../firebase/database'
import EstabelecimentoProdutosListItem from './estabelecimentoProdutosListItem'

let sectionData =[]

import _ from 'lodash'

export class EstabelecimentoProdutosScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.nomeEstabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>),
    tabBarLabel: 'Produtos',
  });

constructor(props){
  super(props);
  this.state = {
    nomeEstabelecimento:'',
    produtosUp:'',
    loading: false,

  }
}

renderSeparatorComponent = () => {
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

renderSeparatorSection = () => {
 return (
   <View
     style={{
       height: 1,
       width: "100%",
       backgroundColor: "#550000",
       marginLeft: 5,
       marginBottom: 7
     }}
   />
 );
};

sectionDataFunction(){
  sectionData = _.groupBy(this.state.produtosUp, p => p.tipo)

  sectionData = _.reduce(sectionData, (acc, next, index) =>{
    acc.push({
      key: index,
      data: next
    })
    return acc
  }, [])
}

componentWillMount(){
  this.setState({
          loading: true
        });

  const {state} = this.props.navigation;
  var nomeEstabelecimentoUp = state.params ? state.params.nomeEstabelecimento : ""

  setTimeout(()=>{
    this.setState({produtosUp: estabelecimentoProd}, function(){
      this.sectionDataFunction()}),
      this.setState({
              loading: false
            });
  },500)

}

renderItem = (item) =>{
  return <EstabelecimentoProdutosListItem
    nomeProduto = {item.item.nomeProduto}
    preco = {item.item.preco}
    detalhes = {item.item.detalhes}
    navigation={this.props.navigation}>
  </EstabelecimentoProdutosListItem>
}

renderHeader = (headerItem) => {
  return  <Text style={styles.headerList}>{headerItem.section.key}</Text>
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
      ItemSeparatorComponent={this.renderSeparatorComponent}
      SectionSeparatorComponent={this.renderSeparatorSection}
      renderItem= {this.renderItem}
      renderSectionHeader={this.renderHeader}
      sections={sectionData}
      keyExtractor={(item) => item._id}
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
      //
//
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
