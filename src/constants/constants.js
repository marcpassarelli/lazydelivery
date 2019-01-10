console.ignoredYellowBox = [
    'Setting a timer'
]
import { StyleSheet, Alert, Navigator } from 'react-native';
import React, { Component } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const images ={
  imageBackground: require('../../img/transparent.png'),
  backgroundSplash: require('../../img/01-Front---background.png'),
  backgroundSplashAzul: require('../../img/01-Front---background-azul.png'),
  iconSplash: require('../../img/Icon---Roxo.png'),
  iconYellow: require('../../img/Logo-amarelo.png'),
  backgroundLazy: require('../../img/cadastro-01-bg.png'),
  backgroundLazyEscuro: require('../../img/cadastro-01-bg-escuro.png'),
  backgroundLogin: require('../../img/Login-background.png'),
  backgroundLoginEmail: require('../../img/Login-02-background.png'),
  logoNomeRoxo:require('../../img/Lazy-_-Logo-Nome.png'),
  logoLogin: require('../../img/Logo-White.png'),
  logoFacebook: require('../../img/facebook.png'),
  seta1: require('../../img/Seta-01.png'),
  seta2: require('../../img/Seta-02.png'),
  pizzaImg: require('../../img/pizzaImg.jpg'),
  preguicaRating:require('../../img/Preguica-contorno.png')
}
export const cores = {
    corPrincipal: '#472c82',
    corSecundaria: 'rgb(252, 204, 60)',
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
  backgroundImage: {

    // resizeMode: 'cover', // or 'stretch'
    flex:1,

    // tintColor: cores.corSecundaria
  },
  backgroundImageAddProduto:{
    alignSelf: 'center',
    justifyContent: 'center'
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
    borderRadius: 3
  },
  containerIndicator:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  containerListItem:{
    flexDirection:'row',
    height:hp('10%'),
    alignItems:'center',
    marginHorizontal: wp('7%'),
    marginBottom: 5,
    marginTop:3,
    flex:1
  },
  containerListItemDisabled:{
    opacity: 0.5,
    flexDirection:'row',
    height:hp('11%'),
    alignItems:'center',
    marginHorizontal: wp('7%'),
    marginBottom: 5,
    marginTop:3,
    flex:1
  },
  containerSearchListItem:{
    position: 'relative',
    flexDirection:'row',
    height:hp('5.73%'),
    alignItems:'center',
    flex:1,
    marginLeft:30,
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
    height:hp('10%'),
    justifyContent:'center'

    // alignItems:'center'
  },
  estabOpenClosed:{
    fontFamily: 'Futura-Medium',
    fontSize: wp('4%'),
    marginLeft: wp('7%')
  },
  developedBy: {
    fontFamily: 'Futura-Medium',
    fontSize: wp('3%'),//10
    alignSelf: 'center',
  },
  header:{
    height:hp('8%'),
    backgroundColor: cores.corPrincipal
  },
  headerText:{
    flex:1,
    fontFamily: 'FuturaPT-Bold',
    color: cores.corSecundaria,
    textAlign: 'center',
    fontSize:wp('5%'),
    fontWeight:'200',
  },
  headerList:{
    fontFamily: 'Futura-Book',
    color: cores.corPrincipal,
    fontSize:wp('4.25%'),//17
    marginLeft:wp('2.66%'),
    flex:1
  },
  headerRight:{
    marginRight: wp('5.32%')
  },
  icon: {
    width: wp('18.36%'),
    height: hp('9%'),
    tintColor: cores.corPrincipal
  },
  imagemEstabInfo:{
    height: hp('11.97%'),
    width: wp('23.96%'),
    alignSelf: 'center',
    resizeMode:'cover',
    marginBottom: hp('3.42%')
  },
  imagemTipoEstabelecimento:{
    height: hp('8.68%'),
    width: wp('17.36%'),
    alignSelf: 'center',
    resizeMode:'cover'
  },
  imagemListaEstabelecimento:{
    height: 60,
    width: 60,
    alignSelf: 'center',
    resizeMode:'cover',
    borderWidth: 1.5,
    borderRadius: 30,
    borderColor: cores.textDetalhes
  },
  imagemListSearch:{
    height: 35,
    width: 35,
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor:cores.corPrincipal,
    resizeMode:'cover'
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
    marginTop: hp('2.54%'),
    marginBottom: hp('2.54%'),
    fontSize: wp('5%'),
    backgroundColor:'transparent',
    fontFamily: 'Futura-Book'
  },
  separator:{
    height:hp('3.4%')
  },
  textAddProduto:{
    backgroundColor:'transparent',
    alignSelf: 'center',
    color: cores.corSecundaria,
    fontSize: wp('4.5%'),
    fontFamily: 'FuturaBT-MediumItalic'
},
textAdicionais:{
  alignSelf: 'flex-start',
  backgroundColor:'transparent',
  justifyContent: 'center',
  color: cores.corPrincipal,
  fontSize: wp('4%'),
  flexWrap: 'wrap',
  fontFamily: 'Futura-Book'
},
  textButtons:{
    backgroundColor:'transparent',
    alignSelf:'center',
    color:'#FFFFFF',
    fontSize: wp('4%'),
    fontFamily: 'Futura-Book'
  },
  textCarrinho:{
    backgroundColor:'transparent',
    color: cores.corPrincipal,
    fontSize: wp('3.75%'),
    fontFamily: 'Futura-Book'
  },
  textCarrinhoAdicionais:{
    backgroundColor:'transparent',
    alignSelf: 'center',
    fontSize: wp('3.5%'),
    fontFamily: 'Futura-Book'
  },
  textDetalhesEstabelecimento:{
    backgroundColor:'transparent',
    marginLeft: wp('1.51%'),
    marginVertical: wp('0.5%'),
    fontSize: wp('3.25%'),
    fontFamily: 'Futura-Book'
  },
  textEndHome:{
    backgroundColor:'transparent',
    fontSize: wp('3.25%'),
    color: cores.corPrincipal,
    fontFamily: 'Futura-Book'
  },
  textEstabelecimento:{
    backgroundColor:'transparent',
    marginLeft: wp('1.51%'),
    fontSize: wp('4.25%'),
    color: cores.corPrincipal,
    fontFamily: 'FuturaBT-MediumItalic'
  },
  textHistoricoPedidos: {
    backgroundColor:'transparent',
    fontSize: wp('3.75%'),
    marginBottom:hp('0.55%'),
    marginLeft: wp('1.11%'),
    fontFamily: 'Futura-Book'
  },
  textInformacoes:{
    backgroundColor:'transparent',
    marginLeft:wp('3.33%'),
    fontSize: wp('4.5%'),
    color:cores.corPrincipal,
    fontFamily: 'FuturaBT-MediumItalic'
  },
  textInformacoes2:{
    backgroundColor:'transparent',
    marginLeft:wp('4.44%'),
    fontSize:wp('4.25%'),
    fontFamily: 'Futura-Book'
  },
  textInformacoesD: {
    backgroundColor:'transparent',
    marginLeft:wp('6.66%'),
    fontSize: wp('4%'),
    fontFamily: 'Futura-Book'
  },
  textInputs:{
    borderColor: cores.corPrincipal,
    fontFamily: 'Futura-Book'
  },
  textPreco:{
    backgroundColor:'transparent',
    fontSize: wp('4%'),
    marginRight: wp('3.33%'),
    color: cores.textDetalhes,
    fontFamily: 'FuturaBT-MediumItalic'
  },
  textProdutos:{
    backgroundColor:'transparent',
    marginLeft: wp('3.33%'),
    fontSize: wp('4%'),
    color: cores.corPrincipal,
    fontFamily: 'FuturaBT-MediumItalic'
  },
  textProfileDetails:{
    backgroundColor:'transparent',
    fontSize:wp('4%'),
    alignSelf:'center',
    color: cores.corPrincipal,
    fontFamily: 'Futura-Book'
  },
  textResumoPgto:{
    backgroundColor:'transparent',
    color: cores.corPrincipal,
    fontSize: wp('4.5%'),
    marginBottom: hp('0.33%'),
    fontFamily: 'Futura-Book'
  },
  textTelaCadastro: {
    backgroundColor:'transparent',
    fontFamily: 'Cochin',
    fontSize: wp('4.5%'),
    textAlign: 'left',
    fontFamily: 'Futura-Book'
  },
  textTipoEstabelecimento:{
    marginLeft: wp('2.22%'),
    fontSize: wp('4.25%'),
    backgroundColor:'transparent',
    color: cores.corPrincipal,
    fontFamily: 'FuturaBT-MediumItalic'
  },
  textUpdateEnd:{
    backgroundColor:'transparent',
    fontSize: wp('3.25%'),
    marginVertical: hp('0.55%'),
    color:'#0000FF',
    fontFamily: 'Futura-Book'
  },
  titleCadastro: {
    backgroundColor:'transparent',
    textAlign: 'center',
    color: 'white',
    fontSize: wp('6%'),
    opacity: 1,
    fontFamily: 'FuturaPT-ExtraBold'
  }
});
