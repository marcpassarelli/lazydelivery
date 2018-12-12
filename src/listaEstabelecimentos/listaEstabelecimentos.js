
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
import { AndroidBackHandler } from 'react-navigation-backhandler';
import _ from 'lodash'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
var todoCounter=0
var tipoEstabelecimentoUp ='';
var bairro=''
var newListaEstabelecimentosOpen=[]
var newListaEstabelecimentosClosed=[]
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
    loadingList: false,
    estabAbertos:[],
    estabFechados:[]

  }
}

 componentWillMount(){
   this.setState({
      loadingList: true
   })


  limparEstabelecimentoProd()
  const {state} = this.props.navigation;
  this.tipoEstabelecimentoUp = state.params ? state.params.tipoEstabelecimento : ""
  this.bairro = state.params ? state.params.bairro:""

  getListaEstabelecimentos(this.tipoEstabelecimentoUp, this.bairro,
  ()=> {
    newListaEstabelecimentosOpen=[]
    newListaEstabelecimentosClosed=[]
    listaEstabelecimentos.map((item,index)=>{
      if(item.aberto==true&&item.frete!='n'){
        newListaEstabelecimentosOpen.push({
          logo: item.logo,
          nome: item.nome,
          precoDelivery: item.precoDelivery,
          tempoEntrega: item.tempoEntrega,
          aberto:item.aberto,
          frete:item.frete,
          _id:todoCounter++
        })
      }else if(item.aberto==false&&item.frete!='n'){
        newListaEstabelecimentosOpen.push({
          logo: item.logo,
          nome: item.nome,
          precoDelivery: item.precoDelivery,
          tempoEntrega: item.tempoEntrega,
          aberto:item.aberto,
          frete:item.frete,
          _id:todoCounter++
        })
      }
    })
    newListaEstabelecimentosOpen = _.orderBy(newListaEstabelecimentosOpen, ['aberto','nome'], ['desc','asc'])
    this.setState({
      estabAbertos:newListaEstabelecimentosOpen,
    },function(){

      this.setState({
        loadingList: false
      });
    });
  })

}

onBackButtonPressAndroid = () =>{
  const {navigate} = this.props.navigation
  const {state} = this.props.navigation
  navigate('Home')
  return true
}

render() {
  console.ignoredYellowBox = [
    'Setting a timer'
  ]

  const content = this.state.loadingList ?

  <View style={styles.containerIndicator}>
    <LazyActivity/>
  </View> :

  <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
  <View style={{flex:1}}>
  <View style={{marginTop:10}}></View>
  <FlatList
    ItemSeparatorComponent={ListItemSeparator}
    data= {this.state.estabAbertos}
    extraData={this.state}
    renderItem= {
      ({item}) =>
      <ListaEstabelecimentosListItem
        aberto={item.aberto}
        estabelecimento = {item.nome}
        imglogoEstabelecimento = {item.logo}
        valorDelivery = {item.frete}
        tempoEntrega = {item.tempoEntrega}
        navigation={this.props.navigation}
        tipoEstabelecimento={this.tipoEstabelecimentoUp}>
      </ListaEstabelecimentosListItem>}
    keyExtractor={item => item._id.toString()}
    />
  </View>
  </AndroidBackHandler>

  return (
    <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
    <ImageBackground
      source={images.imageBackground}
      style={styles.backgroundImage}>
      <Loader
          loading = {this.state.loading}/>
      {content}
    </ImageBackground>
    </AndroidBackHandler>
);
}
}
// {
//   Object.keys(this.state.estabFechados).length>0?
// <View>
//   <Text style={{fontFamily: 'Futura Medium',fontSize: wp('4%'),
//     marginLeft: wp('7%'),color: 'red',marginBottom: hp('1%')}}>Fechado</Text>
//     <FlatList
//       ItemSeparatorComponent={ListItemSeparator}
//       data= {newListaEstabelecimentosClosed}
//       extraData={this.state}
//       renderItem= {
//         ({item}) =>
//         <ListaEstabelecimentosListItem
//           aberto={false}
//           estabelecimento = {item.nome}
//           imglogoEstabelecimento = {item.logo}
//           valorDelivery = {item.frete}
//           tempoEntrega = {item.tempoEntrega}
//           navigation={this.props.navigation}
//           tipoEstabelecimento={this.tipoEstabelecimentoUp}>
//         </ListaEstabelecimentosListItem>}
//       keyExtractor={item => item._id.toString()}
//       />
//     </View>
//     :
//   <View></View>
//
//   }
