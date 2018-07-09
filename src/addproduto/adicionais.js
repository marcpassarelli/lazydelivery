import React, { Component } from 'react';
import { Image, View, Text, Button, ActivityIndicator, FlatList } from 'react-native'
import { styles, cores } from '../constants/constants'
import {listaAdicionais} from '../firebase/database'
import AdicionaisListItem from './adicionaisListItem'
import StatusBar from '../constants/statusBar'

import _ from 'lodash'
export var adicionaisEscolhidos= []
let totalPrice =0
var todoCounter = 1;

var nome=""
var preco=""
var detalhes=""
var imgProduto=""

const adicionais = listaAdicionais

export class AdicionaisScreen extends Component{

  static navigationOptions = ({navigation}) => ({
    title: "Adicionais",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>),
    backBehavior: 'none'
  });

  constructor(props){
    super(props);
    this.state = {
      soma: 0,
      loading: false,
      adicionais,
    }

  }

  componentWillMount(){
    const {state} = this.props.navigation
    this.nome = state.params ? state.params.nome : ""
    this.preco = state.params ? state.params.preco : ""
    this.detalhes = state.params ? state.params.detalhes : ""
    this.imgProduto = state.params ? state.params.imgProduto : ""
    console.log("listaAdicionais"+JSON.stringify(listaAdicionais));
    this.setState({
      adicionais: listaAdicionais
    });
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

  adicionarAdicionais(){
    const {state} = this.props.navigation
    const { navigate } = this.props.navigation;
    var tipoProduto = state.params ? state.params.tipoProduto : ""
    console.log("tipoProduto"+tipoProduto);
    var nomeEstabelecimento = state.params ? state.params.nomeEstabelecimento : ""

    adicionaisEscolhidos = []

    this.state.adicionais.map((item)=>{
      if (item.quantidade>0){
        adicionaisEscolhidos.push({
          nome: item.nome,
          preco: item.preco,
          quantidade: item.quantidade,
          _id:todoCounter++
        })
      }
    })
    navigate('AddProduto',{
      adicionais:adicionaisEscolhidos,
      nomeEstabelecimento:nomeEstabelecimento,
      totalPreco: this.totalPrice,
      nome: this.nome,
      preco: this.preco,
      detalhes:this.detalhes,
      imgProduto:this.imgProduto,
      tipoProduto:tipoProduto,
      telaAdicionais:true,
      tipoEstabelecimento: this.props.navigation.state.params.tipoEstabelecimento})
  }

  onSubtract = (item, index) =>{
  const adicionais = [...this.state.adicionais];
    if(adicionais[index].quantidade>0){
      adicionais[index].quantidade -= 1;
       this.setState({ adicionais });
    }
  }

  onAdd = (item, index) =>{
    const adicionais = [...this.state.adicionais];
    adicionais[index].quantidade += 1;
    this.setState({ adicionais });
  }

  render() {
    const { adicionais } = this.state;
    this.totalPrice=0
      adicionais.forEach((item) => {
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

    <View style={{flex: 1}}>
      <StatusBar/>
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        data= {this.state.adicionais}
        extraData={this.state}
        renderItem={({ item, index }) => (
          <AdicionaisListItem
            item={item}
            onSubtract={() => this.onSubtract(item, index)}
            onAdd={() => this.onAdd(item, index)}
          />
        )}
        keyExtractor={item => item._id}
      />
    <Button
      onPress={()=>{this.adicionarAdicionais()}}
      title="Adicionar"
      color={cores.corPrincipal}
      accessibilityLabel="YourLabelHere"
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
