
import React, { Component } from 'react';
import { ImageBackground, Image, View, Text, FlatList } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import ListaEstabelecimentosListItem from './listaEstabelecimentosListItem'
import {getListaEstabelecimentos, listaEstabelecimentos, limparEstabelecimentoProd} from '../firebase/database'
import Loader from '../loadingModal/loadingModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LazyActivity from '../loadingModal/lazyActivity'
import LazyBackButton from '../constants/lazyBackButton'
import ListItemSeparator from '../constants/listItemSeparator'
import _ from 'lodash'
var tipoEstabelecimentoUp ='';
export class ListaEstabelecimentosScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    headerMode:'float',
    title: _.upperCase(navigation.state.params.tipoEstabelecimento),
    headerTitleStyle: [styles.headerText,{alignSelf:'center'}],
    headerStyle: styles.header,
    headerLeft: (
      <View style={{flex:1}}>
      <LazyBackButton
        goBack={()=>{
        navigation.navigate('Home')
      }}/>
      </View>
    ),
    headerRight:(<View></View>),

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

 componentWillMount(){
   this.setState({
      loadingList: true
   })


  limparEstabelecimentoProd()
  const {state} = this.props.navigation;
  this.tipoEstabelecimentoUp = state.params ? state.params.tipoEstabelecimento : ""

  getListaEstabelecimentos(this.tipoEstabelecimentoUp,
  ()=> {
    this.setState({
      loadingList: false
    },function(){
      console.log("lista");
    });
  })

}

componentDidMount(){


}

render() {
  console.ignoredYellowBox = [
    'Setting a timer'
  ]

  const content = this.state.loadingList ?

  <View style={styles.containerIndicator}>
    <LazyActivity/>
  </View> :

  <View style={{flex:1}}>
  <View style={styles.separator}></View>
  <FlatList
    ItemSeparatorComponent={ListItemSeparator}
    data= {listaEstabelecimentos}
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
    keyExtractor={item => item._id.toString()}
    />
  </View>

  return (

    <ImageBackground
      source={images.imageBackground}
      style={styles.backgroundImage}>
      <Loader
          loading = {this.state.loading}/>
      {content}
    </ImageBackground>
);
}
}
