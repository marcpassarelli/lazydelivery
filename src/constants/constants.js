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
  logoLogin: require('../../img/Logo-White.png'),
  logoFacebook: require('../../img/facebook.png')

}
export const cores = {
    corPrincipal: '#472c82',
    corSecundaria: 'rgba(252, 204, 60,0.85)',
    textDetalhes:'rgb(43, 189, 204)',
};

export const styles = StyleSheet.create({
  logoLogin:{
    height: hp('12.73%'),
    width: wp('63.98%'),
    marginTop: hp('23.15%'),
    marginBottom: hp('12.96%'),
    alignSelf: 'center'
  },
  activityIndicator:{
    justifyContent:'center',
    alignItems:'center',
    height:70
  },
  backgroundImage: {

    // resizeMode: 'cover', // or 'stretch'
    height: hp('100%'),
    width: wp('100%'),
    // tintColor: cores.corSecundaria
  },
  containerButtonFacebook: {
    height: hp('5.94%'),
    width: wp('75.28%'),
    alignSelf: 'center',

    backgroundColor: 'rgb(0,89,159)',
    borderRadius: 3,
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
    marginTop: 70
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
  containerListItemProdutos:{
    flex:1,
    height:60,
    justifyContent:'center'

    // alignItems:'center'
  },
  developedBy: {
    fontFamily: 'Cochin',
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    resizeMode: 'center'
  },
  nomeAppHome:{
    alignSelf:'center',
    color: cores.corPrincipal,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    backgroundColor:'transparent',
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
    color:'rgba(139,0,0,1)'
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
    fontFamily: 'Futura Medium'
},
textAdicionais:{
  backgroundColor:'transparent',
  alignSelf: 'center',
  color: cores.corPrincipal,
  fontSize: 16,
  marginBottom: 15,
  fontFamily: 'Futura Medium'
},
  textButtons:{
    backgroundColor:'transparent',
    alignSelf:'center',
    color:'#FFFFFF',
    fontSize: 16,
    fontFamily: 'Futura Medium'
  },
  textCarrinho:{
    backgroundColor:'transparent',
    alignSelf: 'center',
    color: cores.corPrincipal,
    fontSize: 15,
    fontFamily: 'Futura Medium'
  },
  textCarrinhoAdicionais:{
    backgroundColor:'transparent',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Futura Medium'
  },
  textDetalhesEstabelecimento:{
    backgroundColor:'transparent',
    marginLeft: 5,
    fontSize: 13,
    color: cores.textDetalhes,
    fontFamily: 'Futura Medium'
  },
  textEndHome:{
    backgroundColor:'transparent',
    fontSize: 13,
    marginTop:5,
    color: cores.corPrincipal,
    fontFamily: 'Futura Medium'
  },
  textEstabelecimento:{
    backgroundColor:'transparent',
    marginLeft: 5,
    fontSize: 17,
    color: cores.corPrincipal,
    fontFamily: 'Futura Medium'
  },
  textHistoricoPedidos: {
    backgroundColor:'transparent',
    fontSize: 15,
    color: cores.corPrincipal,
    marginBottom:5,
    marginLeft: 5,
    fontFamily: 'Futura Medium'
  },
  textInformacoes:{
    backgroundColor:'transparent',
    marginLeft:15,
    fontSize: 18,
    color:cores.corPrincipal,
    fontFamily: 'Futura Medium'
  },
  textInformacoes2:{
    backgroundColor:'transparent',
    marginLeft:20,
    fontSize:17,
    color:cores.textDetalhes,
    fontFamily: 'Futura Medium'
  },
  textInformacoesD: {
    backgroundColor:'transparent',
    marginLeft:30,
    fontSize: 16,
    color:cores.textDetalhes,
    fontFamily: 'Futura Medium'
  },
  textInputs:{
    borderColor: cores.corPrincipal,
    fontFamily: 'Futura Medium'
  },
  textPreco:{
    backgroundColor:'transparent',
    fontSize: 15,
    marginRight: 15,
    color: cores.corPrincipal,
    fontFamily: 'Futura Medium'
  },
  textProdutos:{
    backgroundColor:'transparent',
    marginLeft: 10,
    fontSize: 15,
    color: cores.corPrincipal,
    fontFamily: 'Futura Medium'
  },
  textProfileDetails:{
    backgroundColor:'transparent',
    fontSize:18,
    alignSelf:'center',
    color: cores.corPrincipal,
    fontFamily: 'Futura Medium'
  },
  textResumoPgto:{
    backgroundColor:'transparent',
    color: cores.corPrincipal,
    fontSize: 14,
    marginBottom: 3,
    fontFamily: 'Futura Medium'
  },
  textTelaCadastro: {
    backgroundColor:'transparent',
    fontFamily: 'Cochin',
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'Futura Medium'
  },
  textTipoEstabelecimento:{
    marginLeft: 10,
    fontSize: 17,
    backgroundColor:'transparent',
    color: cores.corPrincipal,
    fontFamily: 'Futura Medium'
  },
  textUpdateEnd:{
    backgroundColor:'transparent',
    fontSize: 13,
    marginVertical: 5,
    color:'#0000FF',
    fontFamily: 'Futura Medium'
  },
  titleCadastro: {
    backgroundColor:'transparent',
    paddingBottom: 16,
    textAlign: 'center',
    color: cores.corPrincipal,
    fontSize: 24,
    opacity: 1,
    fontFamily: 'Futura Medium'
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
   fontFamily: 'Futura Medium'
}
});
