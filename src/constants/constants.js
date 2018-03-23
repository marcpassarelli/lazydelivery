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
  activityIndicator:{
    justifyContent:'center',
    alignItems:'center',
    height:70
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
  headerText:{
    color: cores.corPrincipal,
    textAlign: 'center',
    alignSelf:'center',
    fontSize:18,
  },
  header: {
    height:40
  },
  headerList:{
    color: '#FFFFFF',
    fontSize:17,
    marginLeft:10,
    flex:1
  },
  icon: {
    width: 20,
    height: 20,
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
    borderRadius: 60,
    borderWidth: 1,
    borderColor:cores.corPrincipal,
    resizeMode:'cover'
  },
  imagemListSearch:{
    height: 30,
    width: 30,
    alignSelf: 'center',
    borderRadius: 30,
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
    marginTop: 140,
    alignSelf: 'center'
  },
  nomeAppHome:{
    alignSelf:'center',
    color: cores.corPrincipal,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20
  },
  renderSeparatorComponent:{
    height: 1,
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
    height:40,
    color: 'rgba(0,0,0,0.5)',
  },
  searchBarContainer:{
    marginHorizontal: 10,
    borderRadius:6,
    backgroundColor:'rgba(139,0,0,0.1)'
  },
  searchBarInput:{
    backgroundColor: 'rgba(0,0,0,0.1)',
    color:'rgba(139,0,0,1)'
  },
  separator:{
    height:15
  },
  textAddProduto:{
    alignSelf: 'center',
    color: cores.corPrincipal,
    marginLeft:5,
    fontSize: 18,
    marginBottom: 15
},
textAdicionais:{
  alignSelf: 'center',
  color: cores.corPrincipal,
  fontSize: 16,
  marginBottom: 15
},
  textButtons:{
    alignSelf:'center',
    marginTop:10,
    color:'#FFFFFF',
    fontSize: 14,
    fontWeight:'bold'
  },
  textDetalhesEstabelecimento:{
    marginLeft: 5,
    fontSize: 13,
    color: cores.textDetalhes
  },
  textEndHome:{
    fontSize: 13,
    marginTop:5,
    color: cores.corPrincipal,
  },
  textEstabelecimento:{
    marginLeft: 5,
    fontSize: 17,
    color: cores.corPrincipal
  },
  textInformacoes:{
    marginLeft:15,
    fontSize: 18,
    color:cores.corPrincipal
  },
  textInformacoes2:{
    marginLeft:20,
    fontSize:17,
    color:cores.textDetalhes
  },
  textInformacoesD: {
    marginLeft:30,
    fontSize: 16,
    color:cores.textDetalhes
  },
  textInputs:{
    borderColor: '#8b0000',
  },
  textPreco:{
    fontSize: 15,
    marginRight: 15,
    color: cores.corPrincipal
  },
  textProdutos:{
    marginLeft: 10,
    fontSize: 15,
    color: cores.corPrincipal
  },
  textProfileDetails:{
    fontSize:18,
    alignSelf:'center',
    color: cores.corPrincipal,
  },
  textTelaCadastro: {
    fontFamily: 'Cochin',
    fontSize: 18,
    textAlign: 'left',
  },
  textTipoEstabelecimento:{
    marginLeft: 10,
    fontSize: 17,
    color: cores.corPrincipal
  },
  textUpdateEnd:{
    fontSize: 13,
    marginTop:5,
    color:'#0000FF',
  },
  titleCadastro: {
    paddingBottom: 16,
    textAlign: 'center',
    color: cores.corPrincipal,
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 1,
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
   marginTop: 10
}
});
