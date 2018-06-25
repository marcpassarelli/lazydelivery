
import React, { Component } from 'react';
import { Vibration, FlatList, Image, ImageBackground, View, Text, Button, ActivityIndicator, TouchableHighlight, YellowBox, Alert } from 'react-native'
import { styles, cores } from '../constants/constants'
import { updateStatus, loadStatus, carregarPedidos } from '../firebase/database'
import HistoricoPedidosListItem from './historicoPedidosListItem'

import * as firebase from 'firebase';
let todocount=0
let listener = null
let teste=[];
export class HistoricoPedidosScreen extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    //Estados para pegar as informações do Usuário
    this.state = {
      loading:false,
      messages:[],
      refreshing: false
    }

  }

  componentWillMount(){
    this.setState({
      loading:true
    });
  }
  componentDidMount(){
    carregarPedidos((message)=>{
      teste.push({
        id:message._id,
        nome:message.nome,
        telefone:message.telefone,
        endereco:message.endereco,
        bairro: message.bairro,
        referencia: message.referencia,
        formaPgto: message.formaPgto,
        carrinho: message.carrinho,
        createdAt: message.createdAt,
        status: message.status
        })
        console.log("teste.status"+JSON.stringify(teste.status));
      this.setState({
        messages:teste
      },function(){
        console.log("createdAt"+JSON.stringify(this.state.messages[0].createdAt));
        this.setState({
          loading:false
        });
      });
    })


  }

  onPressSend=(item,index)=>{
    console.log("dentro onpresssend");
    const messages = [...this.state.messages]
    updateStatus(messages[index].id,"recebido",(status)=>{
       messages[index].status = status.status
      this.setState({messages});
    })
  }

  _renderItem=({item,index})=>{
    return(
      <HomeListItem
        onPressSend={()=>this.onPressSend(item,index)}
        item={item}>
      </HomeListItem>
    )
  }
  renderSeparatorComponent = () => {
    return (<View style={styles.renderSeparatorComponent}/>)
  };

  functionListaPedidos(){
    if(this.state.messages){
    return(
      <FlatList
        refreshing={this.state.refreshing}
        ItemSeparatorComponent={this.renderSeparatorComponent}
        data={this.state.messages}
        extraData={this.state}
        renderItem={this._renderItem}
        keyExtractor={item => item.id}
        />
    )}else{
      <View>Sem pedidos</View>
    }
  }

  render() {

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

    <View>
      <Text style={{alignSelf: 'center',fontSize: 16, marginBottom: 10}}>Pedidos</Text>
      <View>{this.functionListaPedidos()}</View>
    </View>


    return (
      <ImageBackground
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        <View style={{flex:1}}>
          {content}
        </View>
      </ImageBackground>


    );
  }

}
