import React, { Component } from 'react';
import { FlatList,ScrollView,BackHandler,ImageBackground, Platform, Image, Alert, View, Text, Button, SectionList, Animated } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import {getEstabelecimentoProd, zerarAdicionais,estabelecimentoProd, listaTamanhosPizzas, getTamanhosPizzas, numTamanhos} from '../firebase/database'
import EstabelecimentoProdutosListItem from './estabelecimentoProdutosListItem'
import LazyActivity from '../loadingModal/lazyActivity'
import {aberto,frete,fechando,horarioFechamento} from '../home/home'
import {carrinho, atualizarCarrinho} from '../addproduto/addproduto'
import Toast from 'react-native-toast-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StatusBar from '../constants/statusBar'
import LazySearchBar from '../constants/lazySearchBar'
import ListItemSeparator from '../constants/listItemSeparator'
import LazyYellowButton from '../constants/lazyYellowButton'
import { NavigationActions } from 'react-navigation';
import Accordion from 'react-native-collapsible/Accordion';
import _ from 'lodash';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let sectionData =[]
let sectionName =[]
export var listaPizzas = []
export var listaPizzasDoces = []
export var imgProduto=""

export function atualizarImgProduto(novaImg){
  imgProduto=novaImg
}

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
    animation: new Animated.Value(),
    text:'',
    activeSections: [],
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

  var newEstabelecimentoProd = _.orderBy(estabelecimentoProd, ['ordem'], ['asc'])

  var indexToRemove = []
  listaPizzas = []
  listaPizzasDoces = []

  //pega as pizzas do cardápio e adicionar em listPizzas e criar array de indices q devem ser removidos
  newEstabelecimentoProd.map((item,i)=>{
    if(item.tipo==="Pizzas"){
      listaPizzas.push(newEstabelecimentoProd[i])
      indexToRemove.push(i)
    }
    else if(item.tipo==="Pizzas Doces"){
      listaPizzasDoces.push(newEstabelecimentoProd[i])
      indexToRemove.push(i)
    }

  })
  //id para itens da lista
  var id=0

  if(listaPizzas.length>0){
  //Remover Pizzas da lista de produtos
  for (var i = indexToRemove.length - 1; i>=0;i--){
    newEstabelecimentoProd.splice(indexToRemove[i],1)
  }

//definir preco minimo de cada tamanho
  precoMinimo = _.orderBy(listaPizzas,['preco','tamanho'], ['asc','asc'])
  precoMinimo = _.uniqBy(precoMinimo,'tamanho')

  // organiza por qtde de fatias para definir ordem das pizzas no cardápio
  newListaTamanhosPizzas = _.orderBy(listaTamanhosPizzas, ['fatias'], ['asc'])

  var ordemPizza = listaPizzas[0].ordem
  //array de sabores de pizza agrupados por tamanhos
  listaPizzas = _.groupBy(listaPizzas,'tamanho')


//Cria lista baseado na qtde de sabores q um tamanho aceita, tamanho, qtde fatias e o preco mínimo

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
              nomeProduto: _.upperFirst(item.tamanho)+" ("+item.fatias+" fatias) 1 sabor",
              preco: preco,
              tipo: "Pizzas",
              fatias: item.fatias,
              _id: id++,
              ordem:ordemPizza,
              sabores: j,
              imgProduto: item.imgProduto
            })
          }else{
            newEstabelecimentoProd.push({
              tamanho: item.tamanho,
              nomeProduto: _.upperFirst(item.tamanho)+" ("+item.fatias+" fatias) "+j+" sabores",
              preco: preco,
              tipo: "Pizzas",
              fatias: item.fatias,
              _id: id++,
              ordem:ordemPizza,
              sabores: j,
              imgProduto: item.imgProduto
            })
          }
        }
    })
}

if (listaPizzasDoces.length>0) {
  //definir preco minimo de cada tamanho
    precoMinimo = _.orderBy(listaPizzasDoces,['preco','tamanho'], ['asc','asc'])
    precoMinimo = _.uniqBy(precoMinimo,'tamanho')

    // organiza por qtde de fatias para definir ordem das pizzas no cardápio
    newListaTamanhosPizzas = _.orderBy(listaTamanhosPizzas, ['fatias'], ['asc'])

    var ordemPizza = listaPizzasDoces[0].ordem
    //array de sabores de pizza agrupados por tamanhos
    listaPizzasDoces = _.groupBy(listaPizzasDoces,'tamanho')


  //Cria lista baseado na qtde de sabores q um tamanho aceita, tamanho, qtde fatias e o preco mínimo

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
                nomeProduto: _.upperFirst(item.tamanho)+" ("+item.fatias+" fatias) 1 sabor",
                preco: preco,
                tipo: "Pizzas Doces",
                fatias: item.fatias,
                _id: id++,
                ordem:ordemPizza,
                sabores: j,
                imgProduto: item.imgProduto
              })
            }else{
              newEstabelecimentoProd.push({
                tamanho: item.tamanho,
                nomeProduto: _.upperFirst(item.tamanho)+" ("+item.fatias+" fatias) "+j+" sabores",
                preco: preco,
                tipo: "Pizzas Doces",
                fatias: item.fatias,
                _id: id++,
                ordem:ordemPizza,
                sabores: j,
                imgProduto: item.imgProduto
              })
            }
          }
      })
}
//Separa lista por tipo de produto

  sectionData = _.orderBy(newEstabelecimentoProd, ['ordem'], ['asc'])

  sectionData = _.groupBy(sectionData, p => p.tipo)

  sectionData = _.reduce(sectionData, (acc, next, index) =>{
    acc.push({
      key: index,
      data: next
    })
    return acc
  }, [])
  // this.setState({
  //   listaProdutos:sectionData
  // });
  this.callbackFinishLoading()
}

callbackFinishLoading(){
  this.setState({
    loadingList:false
  },function(){
    // console.log("sectionData: "+JSON.stringify(sectionData));
  });
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick=()=> {

  this.props.navigation.dispatch(NavigationActions.back());
  return true;
}

componentWillMount(){
  this.setState({
          loadingList: true
        });
BackHandler.addEventListener('hardwareBackPress', ()=>this.handleBackButtonClick)


  zerarAdicionais()

  const {state} = this.props.navigation
  var estabelecimento = state.params ? state.params.nomeEstabelecimento : ""
  if(!aberto){
    Alert.alert(
     'ESTABELECIMENTO FECHADO',
     ''+estabelecimento+' encontra-se fechado no momento. Você poderá ver os produtos mas sem adicionar ao carrinho ou encaminhar o pedido. Acesse a aba INFORMAÇÕES para saber o horário de funcionamento.',
     [
       {text: 'OK', onPress: () => {

       }},
     ],
     { cancelable: false }
   )
 }else if(fechando){
    Alert.alert(
     'ESTABELECIMENTO QUASE FECHANDO',
     ''+estabelecimento+' está próximo de fechar por hoje. O horário normal de encerramento hoje é '+horarioFechamento+".",
     [
       {text: 'OK', onPress: () => {

       }},
     ],
     { cancelable: false }
   )
  }




  var toast = state.params ? state.params.toast : ""

  var telaAnterior = state.params ? state.params.telaAnterior : ""


  if(telaAnterior=="listaEstabelecimentos" || telaAnterior=="home" ){
    getTamanhosPizzas(estabelecimento)
    getEstabelecimentoProd(estabelecimento,
    ()=>{
      this.sectionDataFunction()
    },
    ()=>{
      // this.setState({
      //         loadingList: false
      // },function(){
      //   // //console.log("sectiondata"+JSON.stringify(sectionData));
      // })
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
      height: Platform.OS === ("ios") ? hp('10%') : hp('30%'),
      color: '#fccc3c',
      fontSize: wp('3.5%'),
      borderRadius: 15,
      yOffset: 30,
      paddingLeft: 20,
      paddingRight: 20
    })
  }

}

renderItem = item =>{
  const {state} = this.props.navigation;
  var nomeEstabelecimentoUp = state.params ? state.params.nomeEstabelecimento : ""
  // console.log("log item"+JSON.stringify(item));
  // onLayout={this._setMaxHeight.bind(t  his)}
  return (
  <View style={{flex:1}}>
    <FlatList
      ItemSeparatorComponent={ListItemSeparator}
      data= {item.data}
      extraData={this.state}
      renderItem= {
        ({item}) =>
      <EstabelecimentoProdutosListItem
        nomeProduto = {item.nomeProduto}
        tipoProduto = {item.tipo}
        preco = {()=>{

          let str = item.preco.toFixed(2)
          let res = str.toString().replace(".",",")

          if(item.tipo=="Pizzas"){
            return(
                <Text style={styles.textPreco}>A partir de R$ {res}</Text>
            )
          }else if(item.tipo=="Pizzas Doces"){
            return(
                <Text style={styles.textPreco}>A partir de R$ {res}</Text>
            )
          }else{
          return(
              <Text style={[styles.textPreco]}>R$ {res}</Text>
          )}
        }}
        detalhes = {item.detalhes}
        navigation={()=>{

          let titleHeader= ""
          if(item.tipo=="Pizzas"||item.tipo=="Pizzas Doces"){
            //rota para pizzas
            if(item.sabores==1){
              titleHeader = "Escolha o sabor da pizza"
            }else{
              titleHeader = "Escolha o 1º sabor da pizza"
            }
            console.log("nav imgProduto"+JSON.stringify(item));
            imgProduto = item.imgProduto

            const navigateAction = NavigationActions.navigate({
                routeName: 'Pizza',
                params: {nomeEstabelecimento: nomeEstabelecimentoUp,
                title:titleHeader, sabores: item.sabores,
                tamanhoPizza: item.tamanho, partePizza:1, tipoProduto: item.tipo,
                preco:parseInt(0),detalhes:"",imgProduto: item.imgProduto,
              tipoEstabelecimento: this.props.navigation.state.params.tipoEstabelecimento},
                key:Math.random()*100000
              });
            this.props.navigation.dispatch(navigateAction);
            //se houver quantidade de paginas quer dizer que não é pizza e nem é produto normal
          }else if (item.paginas) {
            //rota para produtos com mais de uma pagina
            //qtdePaginas = quantas paginas até chegar no AddProduto
            //tipoPagina =  o que vai ser cada tipo de pagina
            //qtdeItens = caso o tipoPagina for quantidade informar o máximo que pode dar a soma
            //tipoItens = tipo de item que será mostrado em cada página
            //
            let titleHeader= ""
            if(item.paginas.length==1){
              //console.log("uma pagina");
              titleHeader = "Escolha o(s) sabor(es)"
            }else{
              //console.log("mais de uma pagina");
              titleHeader = "Escolha o 1º sabor"
            }


            imgProduto = item.imgProduto
            const navigateAction = NavigationActions.navigate({
                routeName: 'AntesAddProduto',
                params: {
                  title:item.paginas[0].titulo,
                  nomeEstabelecimento: nomeEstabelecimentoUp,
                  nome: item.nomeProduto,
                  pagAtual: 1,
                  paginas: item.paginas,
                  preco: item.preco,
                  detalhes: "",
                  tipoProduto: item.tipo,
                  tipoEstabelecimento: this.props.navigation.state.params.tipoEstabelecimento},
                key:Math.random()*100000
              });
            this.props.navigation.dispatch(navigateAction);

          }else{
            imgProduto = item.imgProduto
            const navigateAction = NavigationActions.navigate({
                routeName: 'AddProduto',
                params: {
                  nomeEstabelecimento: nomeEstabelecimentoUp,
                  nome: item.nomeProduto, preco: item.preco,
                  detalhes: item.detalhes, tipoProduto: item.tipo,
                  tipoEstabelecimento: this.props.navigation.state.params.tipoEstabelecimento},
                key:Math.random()*100000
              });
            this.props.navigation.dispatch(navigateAction);
          }
        }}/>
      }
      keyExtractor={item => item._id.toString()}
      />
  </View>
  )
}

renderHeader = (headerItem) => {
  return  (
      <View style={{flexDirection: 'row', alignItems: 'center',height: hp('4.5%'),
        backgroundColor: cores.corSecundaria,marginBottom: 2}} >

            <Text style={styles.headerList}>{headerItem.key}</Text>

            <Text style={{    fontFamily: 'Futura-Book',
                color: cores.textDetalhes,
                fontSize:wp('3.5%'),marginRight:5,
                }}>(Clique para expandir)</Text>
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
    <View style={{marginBottom: hp('1%')}}>
    <LazyYellowButton
      styleButton={{width: wp('100%'), height: hp('8%')}}
      styleText={{fontFamily:'FuturaPT-Bold',color:cores.corPrincipal,fontSize:wp('5%')}}
      onPress={()=>{this.goToCarrinho()}}
      text={"CARRINHO"}
      />
    </View>)
  }else{
    return(
      <View style={{
  justifyContent: 'flex-end'}}>
      <LazyYellowButton
        styleButton={{width: wp('100%'), height: hp('8%') }}
        styleText={{fontFamily:'FuturaPT-Bold',color:cores.corPrincipal, fontSize: wp('5%')}}
        onPress={()=>{this.goToCarrinho()}}
        text={"CARRINHO"}
        />
    </View>
    )
  }
}

filterSearch(text){
  this.setState({
    loadingList:true
  });
  const newData = newListaEstabelecimentosOpen.filter(function(item){
    const itemData= item.nome.toUpperCase()
    const textData= text.toUpperCase()
    return itemData.indexOf(textData) > -1
  })
  this.setState({
    nomesEstabSearch: newData,
    text: text,
    loadingList:false
  }, function(){

  });
}

_updateSections = activeSections => {
  this.setState({ activeSections },function(){
    console.log("state.activeSections"+this.state.activeSections);
  });
};


  render() {

    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    const content = this.state.loadingList ?

    <View style={styles.containerIndicator}>
      <LazyActivity/>
    </View> :


    <View style={{flex:1}}>
      <ScrollView>
        <Accordion
          sections={sectionData}
          activeSections={this.state.activeSections}
          renderHeader={this.renderHeader}
          renderContent={this.renderItem}
          onChange={this._updateSections}
        />
      </ScrollView>
      <View>{this.functionButton()}</View>

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

const SECTIONS = [
  {
    title: 'First',
    content: [
      {
      content:'Lorem ipsum 1', price: '10'},
      {content:'Lorem ipsum 2', price: '8'}
    ],
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

// <SectionList
//   ItemSeparatorComponent={this.renderListItemSeparator}
//   SectionSeparatorComponent={this.renderSeparatorSection}
//   renderItem={this.renderItem}
//   renderSectionHeader={this.renderHeader}
//   sections={sectionData}
//   keyExtractor={(item) => item._id.toString()}
//   />


// <View style={{marginBottom: 3,borderWidth: 1.5,borderColor: cores.corSecundaria}}>
// <LazySearchBar
//
//   value={this.state.text}
//   clearText={()=>{this.setState({
//     text:""
//   });}}
//   onChangeText={(text) => {this.filterSearch(text)}}
//   onClearText={() => {}}
//   returnKeyType="search"
//   placeholder={'PROCURAR'}/>
// </View>
