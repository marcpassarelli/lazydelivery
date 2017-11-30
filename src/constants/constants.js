console.ignoredYellowBox = [
    'Setting a timer'
]
import { StyleSheet, Alert, Navigator } from 'react-native';
import React, { Component } from 'react';

export const cores = {
    corPrincipal: '#8b0000',
    textDetalhes:'#2F4F4F',
};

export const styles = StyleSheet.create({
  developedBy: {
    fontFamily: 'Cochin',
    fontSize: 10,
    alignSelf: 'center',
  },
  logo: {
    marginTop: 140,
    alignSelf: 'center'
  },
  textTelaCadastro: {
    fontFamily: 'Cochin',
    fontSize: 18,
    textAlign: 'left',
  },
  titleCadastro: {
    paddingBottom: 16,
    textAlign: 'center',
    color: cores.corPrincipal,
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 1,
  },
  labelCadastro: {
    opacity: 1,
  },
  searchBar:{
    height:40,
    color: 'rgba(0,0,0,0.5)',
  },
  searchBarContainer:{
    marginLeft:10,
    marginRight:10,
    borderRadius:6,
    backgroundColor:'rgba(139,0,0,0.1)'
  },
  searchBarInput:{
    backgroundColor: 'rgba(0,0,0,0.1)',
    color:'rgba(139,0,0,1)'
  },
  textInputs:{
    borderColor: '#8b0000',
  },
  backgroundImage: {
   flex: 1,
  // resizeMode: 'cover', // or 'stretch'
   height: null,
   width: null,
 },
 buttonFacebook: {
   height: 60,
   width: null,
   resizeMode: 'contain',
   borderRadius: 6,
 },
 buttons:{
   height: 40,
   width: 300,
   alignSelf: 'center',
   borderRadius: 6,
   backgroundColor: cores.corPrincipal
 },
 textButtons:{
   alignSelf:'center',
   marginTop:10,
   color:'#FFFFFF',
   fontSize: 14,
   fontWeight:'bold'
 },
 separator:{
   height:15
 },
 icon: {
  width: 20,
  height: 20,
},
textProfileDetails:{
  fontSize:18,
  alignSelf:'center',
  color: cores.corPrincipal,
},
textEndHome:{
  fontSize: 15,
  marginTop:5,
  color: cores.corPrincipal,
},
textUpdateEnd:{
  fontSize: 15,
  marginTop:5,
  color:'#0000FF',
},
containerListItem:{
  flexDirection:'row',
  height:60,
  alignItems:'center',
  marginLeft:15,
  marginRight:5,
  marginBottom:10,
  flex:1
},
imagemTipoEstabelecimento:{
  height: 60,
  width: 60,
  alignSelf: 'center',
  borderRadius: 60,
  borderWidth: 1,
  borderColor:cores.corPrincipal,
  resizeMode:'cover'
},
nomeAppHome:{
  alignSelf:'center',
  color: cores.corPrincipal,
  marginTop: 15,
  marginBottom: 15,
  fontSize: 20
},
textTipoEstabelecimento:{
  marginLeft: 10,
  fontSize: 17,
  color: cores.corPrincipal
  },
activityIndicator:{
  justifyContent:'center',
  alignItems:'center',
  height:70
},
containerIndicator:{
  flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 marginTop: 70
},
textEstabelecimento:{
  marginLeft: 5,
  fontSize: 17,
  color: cores.corPrincipal
},
textDetalhesEstabelecimento:{
  marginLeft: 5,
  fontSize: 13,
  color: cores.textDetalhes
},
textInformacoes:{
  marginLeft:15,
  fontSize: 17,
  color:cores.corPrincipal
},
textInformacoesD: {
  marginLeft:15,
  fontSize: 16,
  color:cores.textDetalhes
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
imgProduto:{
  alignSelf: 'center',
  resizeMode: 'cover',
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.7)',
 // resizeMode: 'cover', // or 'stretch'
  height: null,
  width: null,
}
});
