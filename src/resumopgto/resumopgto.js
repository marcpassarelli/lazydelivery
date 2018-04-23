import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList, Icon, TouchableWithoutFeedback } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import {carrinho} from '../addproduto/addproduto'
import {getListaEstabelecimentos, listaEstabelecimentos, getUserDetails, getEstabelecimentoInfo} from '../firebase/database'
import ResumoPgtoListItem from './resumopgtoListItem'
import { RadioButtons } from 'react-native-radio-buttons'

import _ from 'lodash'

const produtosCarrinho = []

export class ResumoPgtoScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: "Resumo Pedido - "+navigation.state.params.nomeEstabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>)
  })

constructor(props){
  super(props);
  this.state = {
    produtosCarrinho,
    loading: false,
    nomeEstabelecimento:"",
    logo: "",
    nome: "",
    precoDelivery: "",
    tempoEntrega: "",
    seg: "",
    ter: "",
    qua: "",
    qui: "",
    sex: "",
    sab: "",
    dom: "",
    deb: "",
    cre: "",
    din: ""

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


async componentWillMount(){

  this.setState({
          loading: true
        });
  let user = await firebase.auth().currentUser;

  getUserDetails(user.uid, (nomeP,telefoneP,enderecoP,numeroEndP,bairroP,referenciaP,profilePicURLP)=>{
    this.setState({
      nome: nomeP,
      telefone: telefoneP,
      endereco:enderecoP,
      numeroEnd:numeroEndP,
      bairro:bairroP,
      referencia:referenciaP,
    });
    this.setState({
            produtosCarrinho: carrinho
          });
  })

  const {state} = this.props.navigation;
  var nomeEstabelecimentoUp = state.params ? state.params.nomeEstabelecimento : ""
  if(nomeEstabelecimentoUp){
    this.setState({nomeEstabelecimento: nomeEstabelecimentoUp}, function(){
      this._callback()
    })
  }


}



_callback(){
  console.log("inside callback");
  getEstabelecimentoInfo(this.state.nomeEstabelecimento, (logoUp, nomeUp, precoDeliveryUp,
    tempoEntregaUp, segUp, terUp, quaUp, quiUp, sexUp, sabUp, domUp, creUp, debUp, dinUp)=>{
    this.setState({
        logo: logoUp,
        nomeEstab: nomeUp,
        precoDelivery: precoDeliveryUp,
        tempoEntrega: tempoEntregaUp,
        seg: segUp,
        ter: terUp,
        qua: quaUp,
        qui: quiUp,
        sex: sexUp,
        sab: sabUp,
        dom: domUp,
        cre: creUp,
        deb: debUp,
        din: dinUp
    })
    this.setState({
          loading: false
        });
  })
}

render() {

  function setSelectedOption(selectedOption){
    this.setState({
      selectedOption
    });
  }
  const options =["option 1","option 2"]

  function renderOption(option, selected, onSelect, index){
    const style = selected ? { fontWeight: 'bold'} : {};

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <Text style={style}>{option}</Text>
      </TouchableWithoutFeedback>
    );
  }

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
    <Text style={[styles.textAdicionais,{fontSize: 18}]}>Formas de Pagamento</Text>
    <View style={{margin: 20}}>
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        data= {this.state.produtosCarrinho}
        extraData={this.state}
        renderItem= {
          ({item}) =>
          <ResumoPgtoListItem
            item ={item}>
          </ResumoPgtoListItem>}
        keyExtractor={item => item._id}
        />
    </View>
    <Text style={styles.textAdicionais}>Informações para Entrega</Text>
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.textResumoPgto}>Entregar para: </Text>
      <Text>{this.state.nome}</Text>
    </View>
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.textResumoPgto}>Telefone para Contato: </Text>
      <Text>{this.state.telefone}</Text>
    </View>
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.textResumoPgto}>Endereço: </Text>
      <Text>{this.state.endereco}, {this.state.numeroEnd}</Text>
    </View>
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.textResumoPgto}>Bairro: </Text>
      <Text>{this.state.bairro}</Text>
    </View>
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.textResumoPgto}>Referência: </Text>
      <Text>{this.state.referencia}</Text>
    </View>
    <View style={{height: 15}}></View>
    <Text style={[styles.textAdicionais,{marginBottom: 10}]}>Resumo do Pedido</Text>
    <View style={{height:2, backgroundColor: cores.corPrincipal}}></View>
    <FlatList
      ItemSeparatorComponent={this.renderSeparator}
      data= {this.state.produtosCarrinho}
      extraData={this.state}
      renderItem= {
        ({item}) =>
        <ResumoPgtoListItem
          item ={item}>
        </ResumoPgtoListItem>}
      keyExtractor={item => item._id}
      />
  </View>

  return (

    <Image
      source={require('../../img/alimentos-fundo2.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.separator}></View>
      {content}
    </Image>
);
}
}
