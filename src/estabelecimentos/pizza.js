import PizzaListItem from './pizzaListItem'

import React, { Component } from 'react';
import { Platform, Image, Alert, View, Text, Button, ActivityIndicator, FlatList } from 'react-native'
import { styles, cores } from '../constants/constants'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StatusBar from '../constants/statusBar'

import { listaPizzas } from './estabelecimentoProdutos'

import _ from 'lodash';

var listaPizzasTamanho = []

export class PizzaScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
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
          navigation.navigate('Estabelecimento',
          {nomeEstabelecimento:navigation.state.params.nomeEstabelecimento,
          tipoEstabelecimento: navigation.state.params.tipoEstabelecimento})
          }}>
        </Icon>
      ),
    headerRight: (<View></View>)
  });

constructor(props){
  super(props);

  this.state = {
    nomeEstabelecimento:'',
    produtosUp:'',
    loadingList: false,
    loading: false,
    expandido: false,
    saboresPizza:''
  }

}

renderSeparatorComponent = () => {
 return (<View style={styles.renderSeparatorComponent}/>);
};

componentWillMount(){

  this.setState({
          loadingList: true
        });
  const {state} = this.props.navigation
  var estabelecimento = state.params ? state.params.nomeEstabelecimento : ""
  tamanhoPizza = state.params ? state.params.tamanhoPizza : ""
  listaPizzasTamanho = listaPizzas[tamanhoPizza]
  listaPizzasTamanho = _.orderBy(listaPizzasTamanho,['preco','nomeProduto'],['asc','asc'])
  
  this.setState({
    loadingList: false
  },function(){
    console.log("listLoadad");
  });

}

renderItem = (item) =>{
  const {state} = this.props.navigation;
  var nomeEstabelecimentoUp = state.params ? state.params.nomeEstabelecimento : ""

  return (
  <View>
    <PizzaListItem
      item={item}
      nomeProduto = {item.nomeProduto}
      preco = {()=>{
        return(
            <Text style={styles.textPreco}>R$ {parseDouble(item.preco)/parseDouble(item.fatias)}</Text>
        )
      }}
      detalhes = {item.detalhes}
      navigation={()=>{
        if(item.item.tipo=="Pizzas"){
          // console.log("Pizzas do tamanho "+item.item.tamanho+": "+JSON.stringify(listaPizzas[item.item.tamanho]));
          this.props.navigation.navigate('Pizza')
        }else{
          this.props.navigation.navigate('AddProduto',{nomeEstabelecimento: nomeEstabelecimentoUp,
          nome: item.item.nomeProduto, preco: item.item.preco, detalhes: item.item.detalhes,
          imgProduto: item.item.imgProduto, tipoProduto: item.item.tipo,
          tipoEstabelecimento: this.props.navigation.state.params.tipoEstabelecimento})
        }
    }}>
  </PizzaListItem>
  </View>
  )
}

  render() {

    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    const content = this.state.loadingList ?

    <View style={styles.containerIndicator}>
      <ActivityIndicator
        color = '#8b0000'
        size="large"
        style = {styles.activityIndicator}/>
    </View> :

    <View style={{flex: 1}}>
      <FlatList
        ItemSeparatorComponent={this.renderSeparatorComponent}
        data={listaPizzasTamanho}
        renderItem={({item})=>(
          <PizzaListItem
            item={item}
            navigation={()=>{
              if(item.item.tipo=="Pizzas"){
                // console.log("Pizzas do tamanho "+item.item.tamanho+": "+JSON.stringify(listaPizzas[item.item.tamanho]));
                this.props.navigation.navigate('Pizza')
              }else{
                this.props.navigation.navigate('AddProduto',{nomeEstabelecimento: nomeEstabelecimentoUp,
                nome: item.nomeProduto, preco: item.item.preco, detalhes: item.detalhes,
                imgProduto: item.imgProduto, tipoProduto: item.tipo,
                tipoEstabelecimento: this.props.navigation.state.params.tipoEstabelecimento})
              }
          }}
            >

          </PizzaListItem>
        )}
        keyExtractor={(item) => item._id}
        />
    </View>

    return (
      <Image
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        {content}
      </Image>
    );
  }
}
