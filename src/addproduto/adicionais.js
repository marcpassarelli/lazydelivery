import React, { Component } from 'react';
import { Image, View, Text, Button, ActivityIndicator, FlatList } from 'react-native'
import { styles, cores, images} from '../constants/constants'
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
var tipoProduto=""

const adicionais = listaAdicionais

export class AdicionaisScreen extends Component{

  static navigationOptions = ({navigation}) => ({
    title: "Adicionais",
    headerTitleStyle: styles.headerText,
    headerLeft: null,
    headerRight: (<View></View>)
  });

  constructor(props){
    super(props);
    this.state = {
      soma: 0,
      loading: false,
      adicionais,
      refresh:false,
      checkBoxChecked:''
    }

  }

  componentWillMount(){
    const {state} = this.props.navigation
    this.nome = state.params ? state.params.nome : ""
    this.preco = state.params ? state.params.preco : ""
    this.detalhes = state.params ? state.params.detalhes : ""
    this.imgProduto = state.params ? state.params.imgProduto : ""
    this.tipoProduto = state.params ? state.params.tipoProduto : ""
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
    const { navigate } = this.props.navigation;
    const { state } = this.props.navigation;
    console.log("this.tipoProduto"+this.tipoProduto);
    var nomeEstabelecimento = state.params ? state.params.nomeEstabelecimento : ""

    adicionaisEscolhidos = []

    if(this.tipoProduto=="Pizzas"){

      this.state.adicionais.map((item)=>{
        if(this.state.checkBoxChecked==item._id){
          this.totalPrice = item.preco
          adicionaisEscolhidos.push({
            nome: item.nome,
            preco: item.preco,
            quantidade: 1,
            _id:todoCounter++,
            tipoProduto: this.tipoProduto
          })
        }
      })

    }else{
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
    }
    console.log("adicionaisEscolhidos"+JSON.stringify(adicionaisEscolhidos))
    console.log("nomeEstabelecimento"+nomeEstabelecimento)
    console.log("this.totalPrice"+this.totalPrice)
    console.log("this.nome"+this.nome)
    console.log("this.preco"+this.preco)
    console.log("this.detalhes"+this.detalhes)
    console.log("this.imgProduto"+this.imgProduto)
    console.log("this.tipoProduto"+this.tipoProduto)
    console.log("this.props.navigation.state.params.tipoEstabelecimento"+this.props.navigation.state.params.tipoEstabelecimento)

    navigate('AddProduto',{
      adicionais:adicionaisEscolhidos,
      nomeEstabelecimento:nomeEstabelecimento,
      totalPreco: this.totalPrice,
      nome: this.nome,
      preco: this.preco,
      precoPizza: this.preco,
      detalhes:this.detalhes,
      imgProduto:this.imgProduto,
      tipoProduto:this.tipoProduto,
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

  onCheckBoxPress = (id) => {
    if(this.state.checkBoxChecked==id) {
      this.setState({
        checkBoxChecked: 100000
      });
    }else{
      this.setState({
        checkBoxChecked: id
      });
    }
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
        extraData={this.state.checkBoxChecked}
        renderItem={({ item, index }) => (
          <AdicionaisListItem
            item={item}
            tipoProduto={this.tipoProduto}
            preco={() => {
              if(this.tipoProduto=="Pizzas"){
                var str = (item.preco).toFixed(2)
                var res = str.toString().replace(".",",")
              }else{
                var str = (item.preco*item.quantidade).toFixed(2)
                var res = str.toString().replace(".",",")
              }

              return(
                  <Text style={styles.textAdicionais}>R$ {res}</Text>
              )
            }}

            checkBoxChecked ={this.state.checkBoxChecked==item._id ? true : false}
            onCheckBoxPress={() => this.onCheckBoxPress(item._id)}

            onSubtract={() => this.onSubtract(item, index)}
            onAdd={() => this.onAdd(item, index)}
          />
        )}
        keyExtractor={item => item._id}
      />
    <Button
      onPress={()=>{this.adicionarAdicionais()}}
      title="Voltar"
      color={cores.corPrincipal}
      accessibilityLabel="YourLabelHere"
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


// refresh={()=>{
//   this.setState({
//     refresh: !this.state.refresh
//   },function(){
//     console.log("state.refresh"+this.state.refresh+" "+index);
//   });
// }}
