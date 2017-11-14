console.ignoredYellowBox = [
    'Setting a timer'
]
import { StyleSheet, Alert, Navigator } from 'react-native';
import React, { Component } from 'react';

const cores = {
    corPrincipal: '#8b0000',
    cinzaDetalhes:'#B22222',
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
   height:10
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
  color: cores.corPrincipal,
  marginLeft: 5
},
textUpdateEnd:{
  fontSize: 15,
  color:'#0000FF',
  marginRight: 20,
},
containerListItem:{
  flexDirection:'row',
  height:60,
  alignItems:'center',
  marginLeft:5,
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
  fontSize: 26
},
textTipoEstabelecimento:{
  marginLeft: 5,
  fontSize: 20,
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
  fontSize: 20,
  color: cores.corPrincipal
},
textDetalhesEstabelecimento:{
  marginLeft: 5,
  fontSize: 14,
  color: cores.cinzaDetalhes
},
});
