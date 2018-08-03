import PizzaListItem from './pizzaListItem'

import React, { Component } from 'react';
import { Platform, Image, Alert, View, Text, Button, ActivityIndicator, FlatList } from 'react-native'
import { styles, cores, images} from '../constants/constants'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StatusBar from '../constants/statusBar'

import { listaPizzas } from './estabelecimentoProdutos'

import _ from 'lodash';

var listaPizzasTamanho = []
var qtdeSabores = 0

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
  this.qtdeSabores = state.params ? state.params.sabores : ""
  console.log("this.qtdeSabores"+this.qtdeSabores);

  listaPizzasTamanho = listaPizzas[tamanhoPizza]
  listaPizzasTamanho = _.orderBy(listaPizzasTamanho,['preco','nomeProduto'],['asc','asc'])
  console.log("listaPizzasTamanho"+JSON.stringify(listaPizzasTamanho));


  this.setState({
    loadingList: false
  },function(){
    console.log("listLoadad");
  });

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
            qtdeSabores={this.qtdeSabores}
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
        source={images.imageBackground}
        style={styles.backgroundImage}>
        {content}
      </Image>
    );
  }
}
