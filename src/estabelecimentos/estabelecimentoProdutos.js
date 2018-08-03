
import React, { Component } from 'react';
import { Platform, Image, Alert, View, Text, Button, ActivityIndicator, SectionList, Animated } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import * as firebase from 'firebase';
import {getEstabelecimentoProd, estabelecimentoProd, listaTamanhosPizzas, getTamanhosPizzas, numTamanhos} from '../firebase/database'
import EstabelecimentoProdutosListItem from './estabelecimentoProdutosListItem'
import {carrinho, atualizarCarrinho} from '../addproduto/addproduto'
import Toast from 'react-native-toast-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StatusBar from '../constants/statusBar'

import _ from 'lodash';

let sectionData =[]
let sectionName =[]
export var listaPizzas = []

const style={
                             backgroundColor: "#4ADDFB",
                             width: 160,
                             height: Platform.OS === ("ios") ? 50 : 80,
                             color: "#ffffff",
                             fontSize: 15,
                             lineHeight: 2,
                             lines: 4,
                             borderRadius: 15,
                             fontWeight: "bold",
                             yOffset: 40,
                         };

export class EstabelecimentoProdutosScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.nomeEstabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: Platform.OS=="ios"? styles.headerIos : styles.headerAndroid,
    headerLeft: (
      <Icon
        style={{marginLeft: 15}}
        name={'arrow-left'}
        size={26}
        color="#000000"
        onPress={
          ()=>{
            if(carrinho.length>0){
              Alert.alert(
                'Sair do Estabelecimento',
                'Tem certeza que deseja sair deste estabelecimento? Todos os items do carrinho serão perdido.',
                [
                  {text: 'Sim', onPress: () => {
                    atualizarCarrinho([])
                    navigation.navigate('ListaEstabelecimentos',
                    {tipoEstabelecimento:navigation.state.params.tipoEstabelecimento})
                  }},
                  {text: 'Não', onPress: ()=>{
                    console.log("cancelado");
                  }},
                ],
                {cancelable: false}
              )
            }else{
              navigation.navigate('Home')
            }
          }}>
        </Icon>
      ),
    headerRight: (<View></View>),
    tabBarLabel: 'Produtos',
  });

constructor(props){
  super(props);

  this.state = {
    nomeEstabelecimento:'',
    produtosUp:'',
    loadingList: false,
    loading: false,
    expandido: false,
    animation: new Animated.Value()
  }

}

renderSeparatorComponent = () => {
 return (<View style={styles.renderSeparatorComponent}/>);
};

renderSeparatorSection = () => {
  return (<View style={{backgroundColor: cores.corPrincipal, height: 3}}/>);
};

sectionDataFunction(){

  var newEstabelecimentoProd = _.orderBy(estabelecimentoProd, ['tipo', 'nomeProduto'], ['asc','asc'])

  var indexToRemove = []
  listaPizzas = []

  //pega as pizzas do cardápio e adicionar em listPizzas e criar array de indices q devem ser removidos
  newEstabelecimentoProd.map((item,i)=>{
    if(item.tipo==="Pizzas"){
      listaPizzas.push(newEstabelecimentoProd[i])
      indexToRemove.push(i)
    }
  })

  //Remover Pizzas da lista de produtos
  for (var i = indexToRemove.length - 1; i>=0;i--){
    newEstabelecimentoProd.splice(indexToRemove[i],1)
  }

//definir preco minimo de cada tamanho
  precoMinimo = _.orderBy(listaPizzas,['preco','tamanho'], ['asc','asc'])
  precoMinimo = _.uniqBy(precoMinimo,'tamanho')

  // organiza por qtde de fatias para definir ordem das pizzas no cardápio
  newListaTamanhosPizzas = _.orderBy(listaTamanhosPizzas, ['fatias'], ['asc'])

  //array de sabores de pizza agrupados por tamanhos
  listaPizzas = _.groupBy(listaPizzas,'tamanho')
  // console.log("listaPizzas"+JSON.stringify(listaPizzas.broto));

//Cria lista baseado na qtde de sabores q um tamanho aceita, tamanho, qtde fatias e o preco mínimo
  //id para itens da lista
  var id=0
    //mapeia lista de tamanhos
    newListaTamanhosPizzas.map((item,i)=>{
      let preco=""
      //mapeia lista com os precos minimos para identificar preco mínimo de cada tamanho
      precoMinimo.map((item2,i2)=>{
        if(item.tamanho==item2.tamanho){
          preco = item2.preco
        }
      })
      //laço para definir item do array de acordo com a quantidade de sabores aceitos para um tamanho
        for(var j = 1;j < parseInt(item.sabores)+1; j++){
          if(j==1){
            newEstabelecimentoProd.push({
              tamanho: item.tamanho,
              nomeProduto: _.upperFirst(item.tamanho)+" ("+item.fatias+" fatias)",
              preco: preco,
              tipo: "Pizzas",
              fatias: item.fatias,
              _id: id++,
              sabores: j
            })
          }else{
            newEstabelecimentoProd.push({
              tamanho: item.tamanho,
              nomeProduto: _.upperFirst(item.tamanho)+" ("+item.fatias+" fatias) "+j+" sabores",
              preco: preco,
              tipo: "Pizzas",
              fatias: item.fatias,
              _id: id++,
              sabores: j
            })
          }
        }
    })
    console.log("newEstabelecimentoProd"+JSON.stringify(newEstabelecimentoProd));
    console.log("listaPizzas"+JSON.stringify(listaPizzas));
//Separa lista por tipo de produto
  sectionData = _.groupBy(newEstabelecimentoProd, p => p.tipo)

  sectionName = sectionData

  sectionData = _.reduce(sectionData, (acc, next, index) =>{
    acc.push({
      key: index,
      data: next
    })
    return acc
  }, [])

}

componentWillMount(){

  this.setState({
          loadingList: true
        });
  const {state} = this.props.navigation
  var estabelecimento = state.params ? state.params.nomeEstabelecimento : ""
  var toast = state.params ? state.params.toast : ""
  var telaAnterior = state.params ? state.params.telaAnterior : ""

  if(telaAnterior=="listaEstabelecimentos" || telaAnterior=="home" ){
    getTamanhosPizzas(estabelecimento)
    getEstabelecimentoProd(estabelecimento,
    ()=>{
      this.sectionDataFunction()
    },
    ()=>{
      this.setState({
              loadingList: false
            })
    })
  }
//para não precisar carregar novamente a lista
  else{
    // this.sectionDataFunction()
    this.setState({
      loadingList:false
    });
  }

  if(toast){
    Toast.show(toast+" foi adicionado ao carrinho",Toast.SHORT, Toast.BOTTOM, this.style)
  }

}

renderItem = (item) =>{
  const {state} = this.props.navigation;
  var nomeEstabelecimentoUp = state.params ? state.params.nomeEstabelecimento : ""

  // onLayout={this._setMaxHeight.bind(t  his)}
  return (
  <View>
    <EstabelecimentoProdutosListItem
      nomeProduto = {item.item.nomeProduto}
      preco = {()=>{
        let str = item.item.preco
        console.log("str"+str);
        let res = str.toString().replace(".",",")

        if(item.item.tipo=="Pizzas"){
          return(
              <Text style={styles.textPreco}>A partir de R$ {res}</Text>
          )
        }else{
        return(
            <Text style={styles.textPreco}>R$ {res}</Text>
        )}
      }}
      detalhes = {item.item.detalhes}
      navigation={()=>{
        if(item.item.tipo=="Pizzas"){
          console.log("Pizzas do tamanho "+item.item.tamanho);
          this.props.navigation.navigate('Pizza',{nomeEstabelecimento: nomeEstabelecimentoUp, title:"Pizza "+item.item.nomeProduto, sabores: item.item.sabores, tamanhoPizza: item.item.tamanho})
        }else{
          this.props.navigation.navigate('AddProduto',{nomeEstabelecimento: nomeEstabelecimentoUp,
          nome: item.item.nomeProduto, preco: item.item.preco, detalhes: item.item.detalhes,
          imgProduto: item.item.imgProduto, tipoProduto: item.item.tipo,
          tipoEstabelecimento: this.props.navigation.state.params.tipoEstabelecimento})
        }
    }}>
    </EstabelecimentoProdutosListItem>
  </View>
  )
}

renderHeader = (headerItem) => {
  return  (
      <View style={{flexDirection: 'row', alignItems: 'center',
        backgroundColor: cores.corPrincipal}} >
            <Text style={styles.headerList}>{headerItem.section.key}</Text>
      </View>
    )
}

renderFooter=()=>{
  return(
    <View style={{backgroundColor: cores.corPrincipal}}></View>
  )
}

goToCarrinho(){
  const { navigate } = this.props.navigation;
    navigate('Carrinho',{nomeEstabelecimento: this.props.navigation.state.params.nomeEstabelecimento})
}

functionButton(){
  if(Platform.OS==='ios'){
    return (
    <View style={{marginBottom: 20}}>
    <Button
        onPress={()=>{this.goToCarrinho()}}
        title="Carrinho"
        color={cores.corPrincipal}
        accessibilityLabel="YourLabelHere"
      />
    </View>)
  }else{
    return(
      <Button
          onPress={()=>{this.goToCarrinho()}}
          title="Carrinho"
          color={cores.corPrincipal}
          accessibilityLabel="YourLabelHere"
        />
    )
  }
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
      <SectionList
        automaticallyAdjustContentInsets={false}
        ItemSeparatorComponent={this.renderSeparatorComponent}
        SectionSeparatorComponent={this.renderSeparatorSection}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderHeader}
        sections={sectionData}
        keyExtractor={(item) => item._id}
        />
      <View>{this.functionButton()}</View>
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
