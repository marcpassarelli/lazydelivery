console.ignoredYellowBox = [
    'Setting a timer'
]
import { StyleSheet, Alert, Navigator } from 'react-native';
import React, { Component } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const images ={
  imageBackground: require('../../img/transparent.png'),
  backgroundSplash: require('../../img/01-Front---background.png'),
  iconSplash: require('../../img/Icon---Roxo.png'),
  backgroundLogin: require('../../img/Login-background.png'),
  backgroundLoginEmail: require('../../img/Login-02-background.png'),
  logoLogin: require('../../img/Logo-White.png'),
  logoFacebook: require('../../img/facebook.png'),


}
export const cores = {
    corPrincipal: '#472c82',
    corSecundaria: 'rgba(252, 204, 60,0.85)',
    textDetalhes:'rgb(43, 189, 204)',
};

export const styles = StyleSheet.create({
  logoLogin:{
    height: hp('18%'),
    width: wp('80%'),
    marginTop: hp('23.15%'),
    marginBottom: hp('13%'),
    alignSelf: 'center'
  },
  activityIndicator:{
    justifyContent:'center',
    alignItems:'center',
    height:70
  },
  backgroundImage: {

    // resizeMode: 'cover', // or 'stretch'
    flex:1,
    height: null,
    width: null
    // tintColor: cores.corSecundaria
  },
  containerButtonFacebook: {
    height: hp('5.94%'),
    width: wp('75.28%'),
    alignSelf: 'center',
    backgroundColor: 'rgb(0,89,159)',
    borderRadius: 3,
    justifyContent: 'center',
  },
  imglogoFB:{
    height: hp('4.32%'),
    width: wp('7.69%'),
    marginHorizontal: wp('3.7%'),

  },
  buttons:{
    height: hp('5.94%'),
    width: wp('75.28%'),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(252, 204, 60)',
    marginBottom: hp('4.98%'),
    borderRadius: 3
  },
  containerIndicator:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  containerListItem:{
    position: 'relative',
    flexDirection:'row',
    height:60,
    alignItems:'center',
    marginLeft:15,
    marginRight:5,
    marginBottom:10,
    flex:1
  },
  containerSearchListItem:{
    position: 'relative',
    flexDirection:'row',
    height:40,
    alignItems:'center',
    flex:1
  },
  containerTextInput:{
    borderColor:'#d1d1d1',
    borderWidth: 1,
    marginHorizontal: wp('12.31%'),
    height: hp('7%'),
    alignItems: 'center'
  },
  containerListItemProdutos:{
    flex:1,
    height:60,
    justifyContent:'center'

    // alignItems:'center'
  },
  developedBy: {
    fontFamily: 'Futura Medium',
    fontSize: 10,
    alignSelf: 'center',
  },
  header:{

  },
  headerText:{
    color: cores.corPrincipal,
    textAlign: 'center',
    alignSelf:'center',
    fontSize:18,
  },
  headerList:{
    color: '#FFFFFF',
    fontSize:17,
    marginLeft:10,
    flex:1
  },
  icon: {
    width: 20,
    height: 20
  },
  imagemEstabInfo:{
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor:cores.corPrincipal,
    resizeMode:'cover'
  },
  imagemTipoEstabelecimento:{
    height: 60,
    width: 60,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor:cores.corPrincipal,
    resizeMode:'cover'
  },
  imagemListSearch:{
    height: 30,
    width: 30,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor:cores.corPrincipal,
    resizeMode:'cover'
  },
  imgProduto:{
    top: 10,
    marginBottom: 10,
    alignSelf: 'center',
    resizeMode: 'stretch',
    borderColor: cores.corPrincipal,
    borderWidth: 1,
    marginBottom: 15
  },
  labelCadastro: {
    opacity: 1,
  },
  logo: {
    height:hp('30%'),
    width: wp('50%'),
    marginTop: hp('28%'),
    alignSelf: 'center',
    resizeMode: 'center'

  },
  nomeAppHome:{
    alignSelf:'center',
    color: cores.corPrincipal,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    backgroundColor:'transparent',
    fontFamily: 'Futura Book'
  },
  renderSeparatorComponent:{
    height: 3,
    width: "100%",
    backgroundColor: "#CED0CE",
    marginLeft: 5,
    marginBottom: 7
  },
  renderSeparatorSection:{
    height: 2,
    width: "100%",
    backgroundColor: "#550000",
    marginLeft: 5,
    marginBottom: 7
  },
  searchBar:{
    height:60,
    color: 'rgba(0,0,0,0.5)',
  },
  searchBarContainer:{
    borderColor:'rgba(139,0,0,0.1)',
    marginHorizontal: 10,
    borderRadius:6,
    backgroundColor:'rgba(139,0,0,0.1)'
  },
  searchBarInput:{
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
    color:'rgba(139,0,0,1)',
    fontFamily: 'Futura Book'
  },
  separator:{
    height:15
  },
  textAddProduto:{
    backgroundColor:'transparent',
    alignSelf: 'center',
    color: cores.corPrincipal,
    marginLeft:5,
    fontSize: 18,
    marginBottom: 15,
    fontFamily: 'Futura Book'
},
textAdicionais:{
  backgroundColor:'transparent',
  alignSelf: 'center',
  color: cores.corPrincipal,
  fontSize: 16,
  marginBottom: 15,
  fontFamily: 'Futura Book'
},
  textButtons:{
    backgroundColor:'transparent',
    alignSelf:'center',
    color:'#FFFFFF',
    fontSize: wp('4%'),
    fontFamily: 'Futura Book'
  },
  textCarrinho:{
    backgroundColor:'transparent',
    alignSelf: 'center',
    color: cores.corPrincipal,
    fontSize: 15,
    fontFamily: 'Futura Book'
  },
  textCarrinhoAdicionais:{
    backgroundColor:'transparent',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Futura Book'
  },
  textDetalhesEstabelecimento:{
    backgroundColor:'transparent',
    marginLeft: 5,
    fontSize: 13,
    color: cores.textDetalhes,
    fontFamily: 'Futura Book'
  },
  textEndHome:{
    backgroundColor:'transparent',
    fontSize: 13,
    marginTop:5,
    color: cores.corPrincipal,
    fontFamily: 'Futura Book'
  },
  textEstabelecimento:{
    backgroundColor:'transparent',
    marginLeft: 5,
    fontSize: 17,
    color: cores.corPrincipal,
    fontFamily: 'Futura Book'
  },
  textHistoricoPedidos: {
    backgroundColor:'transparent',
    fontSize: 15,
    color: cores.corPrincipal,
    marginBottom:5,
    marginLeft: 5,
    fontFamily: 'Futura Book'
  },
  textInformacoes:{
    backgroundColor:'transparent',
    marginLeft:15,
    fontSize: 18,
    color:cores.corPrincipal,
    fontFamily: 'Futura Book'
  },
  textInformacoes2:{
    backgroundColor:'transparent',
    marginLeft:20,
    fontSize:17,
    color:cores.textDetalhes,
    fontFamily: 'Futura Book'
  },
  textInformacoesD: {
    backgroundColor:'transparent',
    marginLeft:30,
    fontSize: 16,
    color:cores.textDetalhes,
    fontFamily: 'Futura Book'
  },
  textInputs:{
    borderColor: cores.corPrincipal,
    fontFamily: 'Futura Book'
  },
  textPreco:{
    backgroundColor:'transparent',
    fontSize: 15,
    marginRight: 15,
    color: cores.corPrincipal,
    fontFamily: 'Futura Book'
  },
  textProdutos:{
    backgroundColor:'transparent',
    marginLeft: 10,
    fontSize: 15,
    color: cores.corPrincipal,
    fontFamily: 'Futura Book'
  },
  textProfileDetails:{
    backgroundColor:'transparent',
    fontSize:18,
    alignSelf:'center',
    color: cores.corPrincipal,
    fontFamily: 'Futura Book'
  },
  textResumoPgto:{
    backgroundColor:'transparent',
    color: cores.corPrincipal,
    fontSize: 14,
    marginBottom: 3,
    fontFamily: 'Futura Book'
  },
  textTelaCadastro: {
    backgroundColor:'transparent',
    fontFamily: 'Cochin',
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'Futura Book'
  },
  textTipoEstabelecimento:{
    marginLeft: 10,
    fontSize: 17,
    backgroundColor:'transparent',
    color: cores.corPrincipal,
    fontFamily: 'Futura Book'
  },
  textUpdateEnd:{
    backgroundColor:'transparent',
    fontSize: 13,
    marginVertical: 5,
    color:'#0000FF',
    fontFamily: 'Futura Book'
  },
  titleCadastro: {
    backgroundColor:'transparent',
    paddingBottom: 16,
    textAlign: 'center',
    color: cores.corPrincipal,
    fontSize: 24,
    opacity: 1,
    fontFamily: 'Futura Book'
  },
  container: {
   alignItems: 'center',
   backgroundColor: '#ede3f2',
   padding: 100
},
modal: {
   flex: 1,
   alignItems: 'center',
   backgroundColor: '#f7021a',
   padding: 100
},
text: {
   color: '#3f2949',
   marginTop: 10,
   fontFamily: 'Futura Book'
}
});
