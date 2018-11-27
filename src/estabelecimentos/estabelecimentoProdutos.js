import React, { Component } from 'react';
import { ImageBackground, Platform, Image, Alert, View, Text, Button, SectionList, Animated } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import {getEstabelecimentoProd, zerarAdicionais,estabelecimentoProd, listaTamanhosPizzas, getTamanhosPizzas, numTamanhos} from '../firebase/database'
import EstabelecimentoProdutosListItem from './estabelecimentoProdutosListItem'
import LazyActivity from '../loadingModal/lazyActivity'
import {carrinho, atualizarCarrinho} from '../addproduto/addproduto'
import Toast from 'react-native-toast-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StatusBar from '../constants/statusBar'
import ListItemSeparator from '../constants/listItemSeparator'
import LazyYellowButton from '../constants/lazyYellowButton'
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let sectionData =[]
let sectionName =[]
export var listaPizzas = []



export class EstabelecimentoProdutosScreen extends Component{


  static navigationOptions = ({navigation}) => ({
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

renderSeparatorSection = () => {
  return (<View style={{backgroundColor: cores.corSecundaria, height: 3}}/>);
};

renderListItemSeparator = () =>{
  return (
    <View
      style={{
        height: 2,
        backgroundColor: cores.corSecundaria,
        marginHorizontal: 5,
        marginBottom:hp('0.77%')
      }}
    />

)
}

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

  zerarAdicionais()
  this.setState({
          loadingList: true
        });
  const {state} = this.props.navigation
  var estabelecimento = state.params ? state.params.nomeEstabelecimento : ""
  var toast = state.params ? state.params.toast : ""
  console.log("toast"+toast);
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
    Toast.show(toast+" foi adicionado ao carrinho",Toast.SHORT, Toast.BOTTOM, {
      backgroundColor: '#472c82',
      height: Platform.OS === ("ios") ? hp('25%') : hp('30%'),
      color: '#fccc3c',
      fontSize: wp('3.5%'),
      borderRadius: 25,
      yOffset: 30,
      paddingLeft: 20,
      paddingRight: 20
    })
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
      tipoProduto = {item.item.tipo}
      preco = {()=>{
        let str = item.item.preco
        let res = str.toString().replace(".",",")

        if(item.item.tipo=="Pizzas"){
          return(
              <Text style={styles.textPreco}>A partir de R$ {res}</Text>
          )
        }else{
        return(
            <Text style={[styles.textPreco]}>R$ {res}</Text>
        )}
      }}
      detalhes = {item.item.detalhes}
      navigation={()=>{

        let titleHeader= ""
        if(item.item.tipo=="Pizzas"){
          if(item.item.sabores==1){
            titleHeader = "Escolha o sabor da pizza"
          }else{
            titleHeader = "Escolha o 1º sabor da pizza"
          }
          const navigateAction = NavigationActions.navigate({
              routeName: 'Pizza',
              params: {nomeEstabelecimento: nomeEstabelecimentoUp,
              title:titleHeader, sabores: item.item.sabores,
              tamanhoPizza: item.item.tamanho, partePizza:1, tipoProduto: item.item.tipo,
              preco:parseInt(0),detalhes:"",
            tipoEstabelecimento: this.props.navigation.state.params.tipoEstabelecimento},
              key:Math.random()*100000
            });
          this.props.navigation.dispatch(navigateAction);

        }else{
          const navigateAction = NavigationActions.navigate({
              routeName: 'AddProduto',
              params: {
                nomeEstabelecimento: nomeEstabelecimentoUp,
                nome: item.item.nomeProduto, preco: item.item.preco,
                detalhes: item.item.detalhes, imgProduto: item.item.imgProduto,
                tipoProduto: item.item.tipo,
                tipoEstabelecimento: this.props.navigation.state.params.tipoEstabelecimento},
              key:Math.random()*100000
            });
          this.props.navigation.dispatch(navigateAction);
        }
    }}>
    </EstabelecimentoProdutosListItem>
  </View>
  )
}

renderHeader = (headerItem) => {
  return  (
      <View style={{flexDirection: 'row', alignItems: 'center',
        backgroundColor: cores.corSecundaria}} >
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
    navigate('Carrinho',{nomeEstabelecimento: this.props.navigation.state.params.nomeEstabelecimento,
    tipoEstabelecimento:this.props.navigation.state.params.tipoEstabelecimento})
}

functionButton(){
  if(Platform.OS==='ios'){
    return (
    <View style={{marginBottom: hp('2.22%')}}>
    <LazyYellowButton
      styleButton={{width: wp('100%'), }}
      styleText={{fontFamily:'Futura PT Bold',color:cores.corPrincipal}}
      onPress={()=>{this.goToCarrinho()}}
      text={"CARRINHO"}
      />
    </View>)
  }else{
    return(
      <LazyYellowButton
        styleButton={{width: wp('100%'), }}
        styleText={{fontFamily:'Futura PT Bold',color:cores.corPrincipal, fontSize: wp('5%')}}
        onPress={()=>{this.goToCarrinho()}}
        text={"CARRINHO"}
        />
    )
  }
}

onBackButtonPressAndroid = () =>{
  const {navigate} = this.props.navigation
  const {state} = this.props.navigation
  if(carrinho.length>0){
    Alert.alert(
      'Sair do Estabelecimento',
      'Tem certeza que deseja sair deste estabelecimento? Todos os items do carrinho serão perdido.',
      [
        {text: 'Sim', onPress: () => {
          console.log("tipoestabelecimento onPress:"+navigation.state.params.tipoEstabelecimento);
          atualizarCarrinho([])
          navigation.navigate('ListaEstabelecimentos',
          {tipoEstabelecimento:navigation.state.params.tipoEstabelecimento})
          return true
        }},
        {text: 'Não', onPress: ()=>{
          console.log("cancelado");
        }},
      ],
      {cancelable: false}
    )
  }else{
    navigation.navigate('Home')
    return true
  }

}



  render() {

    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    const content = this.state.loadingList ?

    <View style={styles.containerIndicator}>
      <LazyActivity/>
    </View> :

    <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
    <View style={{flex: 1}}>
      <SectionList
        automaticallyAdjustContentInsets={false}
        ItemSeparatorComponent={this.renderListItemSeparator}
        SectionSeparatorComponent={this.renderSeparatorSection}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderHeader}
        sections={sectionData}
        keyExtractor={(item) => item._id.toString()}
        />
      <View>{this.functionButton()}</View>
    </View>
  </AndroidBackHandler>

    return (
      <ImageBackground
        source={images.imageBackground}
        style={styles.backgroundImage}>
        {content}
      </ImageBackground>
    );
  }
}
