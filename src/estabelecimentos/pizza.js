import PizzaListItem from './pizzaListItem'

import React, { Component } from 'react';
import { ImageBackground, Platform, Image, Alert, View, Text, Button, FlatList,BackHandler } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import LazyActivity from '../loadingModal/lazyActivity'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StatusBar from '../constants/statusBar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ListItemSeparator from '../constants/listItemSeparator'
import { listaPizzas } from './estabelecimentoProdutos'
import LazyBackButton from '../constants/lazyBackButton'

import _ from 'lodash';

var listaPizzasTamanho = []
var qtdeSabores = 0
var partePizza = 0

export class PizzaScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerTitleStyle: [styles.headerText,{textAlign: 'right',marginRight:20}],
    headerStyle: styles.header,
    headerLeft: (
      <View style={{}}>
        <LazyBackButton
          goBack={()=>{
            navigation.navigate('Estabelecimento',
            {nomeEstabelecimento:navigation.state.params.nomeEstabelecimento,
            tipoEstabelecimento: navigation.state.params.tipoEstabelecimento})
            }}/>
      </View>
    ),
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

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick=()=> {
  this.props.navigation.goBack();
  return true;
}


componentWillMount(){
   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  this.setState({
          loadingList: true
        });
  const {state} = this.props.navigation

  var estabelecimento = state.params ? state.params.nomeEstabelecimento : ""
  tamanhoPizza = state.params ? state.params.tamanhoPizza : ""
  this.qtdeSabores = state.params ? state.params.sabores : ""
  this.partePizza = state.params ? state.params.partePizza: ""


  listaPizzasTamanho = listaPizzas[tamanhoPizza]
  listaPizzasTamanho = _.orderBy(listaPizzasTamanho,['preco','nomeProduto'],['asc','asc'])


  this.setState({
    loadingList: false
  },function(){
    console.log("listLoadad");
  });

}

_renderSeparator(){
  return (
    <View
      style={{
        height: 3,
        backgroundColor: cores.corSecundaria,
        marginHorizontal: 8,
        marginBottom:hp('0.77%')
      }}
    />

)
}

  render() {

    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    const content = this.state.loadingList ?

    <View style={styles.containerIndicator}>
      <LazyActivity/>
    </View> :

    <View style={{flex: 1}}>
      <FlatList
        ItemSeparatorComponent={this._renderSeparator}
        data={listaPizzasTamanho}
        renderItem={({item})=>(

          <PizzaListItem
            nomeProduto={()=>{
              if(this.qtdeSabores==1){
                return(
                  <Text style={styles.textProdutos}>{item.nomeProduto}</Text>
                )
              }else{
                return(
                  <Text style={styles.textProdutos}>{item.nomeProduto}</Text>
                )
              }
            }}
            preco={()=>{
              var preco = (item.preco/this.qtdeSabores).toFixed(2)

              var res = preco.replace(".",",")
              return(
                <Text style={[styles.textProdutos,{marginRight: 10}]}>R$ {res}</Text>
              )
            }}
            item={item}
            navigation={()=>{
              const {state} = this.props.navigation

              let preco = (item.preco/this.qtdeSabores).toFixed(2)
              // console.log("preco "+preco);
              // console.log("state.params.preco"+state.params.preco);
              let precoParams = state.params.precoPizza ? state.params.precoPizza : 0
              precoParams = (parseFloat(precoParams)).toFixed(2)
              let precoPizza = parseFloat(preco) + parseFloat(precoParams)

              let numSabor = state.params.partePizza+1
              let sabores=""
              if(state.params.sabores==1){
                sabores = "Sabor"
              }else{
                sabores = "Sabores"
              }

              if(state.params.partePizza==state.params.sabores){
                this.props.navigation.navigate('AddProduto',{
                nomeEstabelecimento: state.params.nomeEstabelecimento,
                nome: "Pizza "+_.upperFirst(state.params.tamanhoPizza)+" "+state.params.sabores+" "+sabores,
                preco: preco, precoPizza: precoPizza,
                detalhes: "Sabores da Pizza: "+state.params.detalhes+item.nomeProduto+"("+preco+")",
                imgProduto: "https://firebasestorage.googleapis.com/v0/b/deliveryaltamira.appspot.com/o/produtos%2FCasa%20Nova%2Fdiversos-tamanhos-varios.jpg?alt=media&token=a548a5f5-14a9-47a4-9a30-0fd56e838e0c" , tipoProduto: state.params.tipoProduto ,
                tipoEstabelecimento: state.params.tipoEstabelecimento,
                tipoProduto: state.params.tipoProduto})
              }else{
                this.props.navigation.push('Pizza',{nomeEstabelecimento: state.params.tipoEstabelecimento,
                tipoEstabelecimento: state.params.tipoEstabelecimento,
                title:"Escolha o "+numSabor+"º sabor da pizza", preco: preco, precoPizza: precoPizza,
                detalhes:state.params.detalhes+item.nomeProduto+"("+preco+"), ",
                sabores: state.params.sabores, tipoProduto: state.params.tipoProduto,
                tamanhoPizza: state.params.tamanhoPizza, partePizza: state.params.partePizza+1,
                nomeEstabelecimento: state.params.nomeEstabelecimento  })
              }
          }}
            >
          </PizzaListItem>
        )}
        keyExtractor={(item) => item._id.toString()}
        />
    </View>

    return (
      <ImageBackground
        source={images.imageBackground}
        style={styles.backgroundImage}>
        {content}
      </ImageBackground>
    );
  }
}
