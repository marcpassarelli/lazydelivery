
import React, { Component } from 'react';
import { ImageBackground, FlatList, Image, View, Text, Button, ActivityIndicator, TouchableHighlight, YellowBox } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import { updateStatus, carregarPedidos } from '../firebase/database'
import HistoricoPedidosListItem from './historicoPedidosListItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as firebase from 'firebase';
let todocount=0
let listener = null
let teste=[];
export class HistoricoPedidosScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: "Histórico de Pedidos",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerLeft: (
      <Icon
        style={{marginLeft: 15}}
        name={'arrow-left'}
        size={26}
        color="#000000"
        onPress={
          ()=>{
          navigation.navigate('Home')
          }}>
        </Icon>
      ),
    headerRight: (<View></View>)
  })

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
        endereco:message.endereco,
        bairro: message.bairro,
        estabelecimento: message.estabelecimento,
        formaPgto: message.formaPgto,
        carrinho: message.carrinho,
        frete: message.frete,
        valorCompra: message.valorCompra,
        createdAt: message.createdAt,
        logo: message.logo,
        retirar: message.retirar
        })
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
    // const messages = [...this.state.messages]
    const { navigate } = this.props.navigation;
    navigate('DetalhesPedido',{
      endereco:item.endereco,
      bairro: item.bairro,
      estabelecimento: item.estabelecimento,
      formaPgto: item.formaPgto,
      carrinho: item.carrinho,
      valorCompra: item.valorCompra,
      createdAt: item.createdAt,
      logo: item.logo,
      frete: item.frete,
      retirar: item.retirar
  })
  }

  _renderItem=({item,index})=>{
    return(
      <HistoricoPedidosListItem
        onPressSend={()=>this.onPressSend(item,index)}
        item={item}>
      </HistoricoPedidosListItem>
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
      <View>{this.functionListaPedidos()}</View>
    </View>


    return (
      <Image
        source={images.imageBackground}
        style={styles.backgroundImage}>
        <View style={{flex:1}}>
          {content}
        </View>
      </Image>
    );
  }

}
