
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList, Icon } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import ListaEstabelecimentosListItem from './listaEstabelecimentosListItem'
import {getListaEstabelecimentos, listaEstabelecimentos, limparEstabelecimentoProd} from '../firebase/database'
import Loader from '../loadingModal/loadingModal';

import _ from 'lodash'
var tipoEstabelecimentoUp ='';
export class ListaEstabelecimentosScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.tipoEstabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>)
  });

constructor(props){
  super(props)
  this.state = {
    tipoEstabelecimento:'',
    listaEstabelecimentosUp:'',
    loading: false,
    loadingList: false

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


 componentWillMount(){
   this.setState({
      loadingList: true
   })


  limparEstabelecimentoProd()
  const {state} = this.props.navigation;
  this.tipoEstabelecimentoUp = state.params ? state.params.tipoEstabelecimento : ""
  console.log("tipoEstabelecimento"+this.tipoEstabelecimentoUp);
  getListaEstabelecimentos(this.tipoEstabelecimentoUp)

  this.setState({ listaEstabelecimentosUp: listaEstabelecimentos }, function(){
    console.log("inside setstate");
      if(this.state.listaEstabelecimentosUp){
        console.log("dentro if");
        setTimeout(()=>{
          this.setState({
            loadingList: false
          })
        },250)
      }
    })






  // setTimeout(()=>{
  //   this.setState({ listaEstabelecimentosUp: listaEstabelecimentos }, function(){
  //       this.setState({
  //         loadingList: false
  //       })
  //     })
  // },500)

}

componentDidMount(){


}

  //   setTimeout(()=>{
  // },750)
render() {
  console.ignoredYellowBox = [
    'Setting a timer'
  ]

  const content = this.state.loadingList ?

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
        navigation={this.props.navigation}
        tipoEstabelecimento={this.tipoEstabelecimentoUp}>
      </ListaEstabelecimentosListItem>}
    keyExtractor={item => item._id}
    />
  </View>

  return (

    <Image
      source={require('../../img/alimentos-fundo2.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.separator}></View>
      <Loader
          loading = {this.state.loading}/>
      {content}
    </Image>
);
}
}
