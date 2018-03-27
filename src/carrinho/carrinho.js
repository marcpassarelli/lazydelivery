
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import {getListaEstabelecimentos, listaEstabelecimentos} from '../firebase/database'
import {carrinho} from '../addproduto/addproduto'
import CarrinhoListItem from './carrinhoListItem'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import _ from 'lodash'
let totalPrice =0
const produtosCarrinho = carrinho

export class CarrinhoScreen extends Component{



  static navigationOptions = ({navigation}) => ({
    title: "Carrinho",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>)
  });

  constructor(props){
    super(props);
    this.state = {
      tipoEstabelecimento:'',
      listaEstabelecimentosUp:'',
      loading: false,
      produtosCarrinho
    }

  }


  componentWillMount(){
    console.log("carrinho: "+JSON.stringify(carrinho));

    this.setState({
      loading: true
    })

    this.setState({
      produtosCarrinho: carrinho
    }, function(){
      setTimeout(()=>{
        this.setState({
          loading: false
        })
      },500);
    })

    const {state} = this.props.navigation;
    var tipoEstabelecimentoUp = state.params ? state.params.tipoEstabelecimento : ""

  }

  renderSeparatorComponent = () => {
   return (<View style={styles.renderSeparatorComponent}/>);
  };


  onSubtract = (item, index) =>{
  const produtosCarrinho = [...this.state.produtosCarrinho];
  console.log("produtosCarrinho"+produtosCarrinho);
    if(produtosCarrinho[index].quantidade>1){
      produtosCarrinho[index].quantidade -= 1;
       this.setState({ produtosCarrinho });
    }
  }

  onAdd = (item, index) =>{
    const produtosCarrinho = [...this.state.produtosCarrinho];
    produtosCarrinho[index].quantidade += 1;
    this.setState({ produtosCarrinho });
  }

  functionCarrinho=()=>{
    console.log("carrinho nome"+carrinho.nome);
    if(carrinho.length>0){
      return(
        <View style={{flex: 1}}>
          <FlatList
            ItemSeparatorComponent={this.renderSeparatorComponent}
            data= {this.state.produtosCarrinho}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <CarrinhoListItem
                item={item}
                onSubtract={() => this.onSubtract(item, index)}
                onAdd={() => this.onAdd(item, index)}
              />
            )}
            keyExtractor={item => item._id}
          />
        <View style={{flexDirection: 'column'}}>
          <Text style={[styles.textAdicionais,{justifyContent: 'flex-start'}]}>Valor Total Pedido:</Text>
          <Text style={{justifyContent: 'flex-end'}}>R$ {this.totalPrice}</Text>
        </View>
      </View>)

    }else{
      return(<Text style={styles.textAddProduto}>Não há itens no carrinho.</Text>)
    }
  }


  render() {
    const { produtosCarrinho } = this.state
    this.totalPrice=0
      produtosCarrinho.forEach((item) => {
        this.totalPrice += item.quantidade * item.preco;
      })
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
      {this.functionCarrinho()}
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
