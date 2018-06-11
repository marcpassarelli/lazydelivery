
import React, { Component } from 'react';
import { Platform, Image, Alert, View, Text, Button, ActivityIndicator, SectionList, TouchableOpacity, Animated, PixelRatio } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import {getEstabelecimentoProd, estabelecimentoProd, getEstabelecimentoTiposProd, estabelecimentoTiposProd, getEstabelecimentoProdutos} from '../firebase/database'
import EstabelecimentoProdutosListItem from './estabelecimentoProdutosListItem'
import {carrinho, atualizarCarrinho} from '../addproduto/addproduto'
import Loader from '../loadingModal/loadingModal'
import Toast from 'react-native-toast-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StatusBar from '../constants/statusBar'

let sectionData =[]
let sectionName =[]

var tamanhoCelula = 60,
    tamanhoHeader = 30

import _ from 'lodash'

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
    headerStyle: styles.header,
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

  // this.icons ={
  //   'up' : require('../../img/up.png'),
  //   'down' : require('../../img/down.png')
  // }

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

  sectionData = _.groupBy(this.state.produtosUp, p => p.tipo)

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

    console.log("inicio estabelecimentoProd:"+estabelecimentoProd);
  this.setState({
          loadingList: true
        });
  const {state} = this.props.navigation
  var estabelecimento = state.params ? state.params.nomeEstabelecimento : ""
  var toast = state.params ? state.params.toast : ""
  var telaAnterior = state.params ? state.params.telaAnterior : ""

  if(telaAnterior=="listaEstabelecimentos" || telaAnterior=="home" ){
    getEstabelecimentoProd(estabelecimento)
    setTimeout(()=>{
      this.setState({produtosUp: estabelecimentoProd}, function(){
        this.sectionDataFunction(),
        this.setState({
                loadingList: false
              });
        console.log("estabelecimentoProd:"+estabelecimentoProd);
      })
    },750)
  }
//para não precisar carregar novamente a lista
  else{
    console.log("dentro do else ");
    // this.sectionDataFunction()
    this.setState({
      loadingList:false
    });
  }

  if(toast){
    console.log("carrinho:"+JSON.stringify(carrinho));
    Toast.show(toast+" foi adicionado ao carrinho",Toast.SHORT, Toast.BOTTOM, this.style)
  }

}

renderItem = (item) =>{
  const {state} = this.props.navigation;
  var nomeEstabelecimentoUp = state.params ? state.params.nomeEstabelecimento : ""

  // onLayout={this._setMaxHeight.bind(t  his)}
  return (
  <Animated.View style={{height: this.state.animation}}>
    <EstabelecimentoProdutosListItem
      estabelecimento = {nomeEstabelecimentoUp}
      nomeProduto = {item.item.nomeProduto}
      preco = {item.item.preco}
      detalhes = {item.item.detalhes}
      imgProduto = {item.item.imgProduto}
      tipoProduto = {item.item.tipo}
      navigation={this.props.navigation}>
    </EstabelecimentoProdutosListItem>
  </Animated.View>
  )
}
// onLayout = {this._setMaxHeight.bind(this)}
  // onPress={()=>{this.toggle(headerItem.section.key)}}
renderHeader = (headerItem) => {
  // let icon = this.icons['down'];
  // if(this.state.expanded){
  //     icon = this.icons['up'];
  // }
  // onLayout={this._setMinHeight.bind(this)}
  // <Image
  //    style={{width:30, height: 25, marginRight:10}}
  //    source={icon}>
  //  </Image>
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
        ItemSeparatorComponent={this.renderSeparatorComponent}
        SectionSeparatorComponent={this.renderSeparatorSection}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderHeader}
        sections={sectionData}
        keyExtractor={(item) => item._id}
        />
      <Button
          onPress={()=>{this.goToCarrinho()}}
          title="Carrinho"
          color={cores.corPrincipal}
          accessibilityLabel="YourLabelHere"
        />
    </View>

    return (
      <Image
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        <StatusBar/>
        {content}
      </Image>
    );
  }
}

// toggle(headerName){
//     //Step 1
//   let initialValue    = this.state.expandido? tamanhoHeader : tamanhoCelula * sectionName[headerName].length + tamanhoHeader,
//       finalValue      = this.state.expandido? tamanhoCelula * sectionName[headerName].length + tamanhoHeader : tamanhoHeader;
//
//
//   this.setState({
//       expandido : !this.state.expandido  //Step 2
//   });
//
//   this.state.animation.setValue(initialValue);  //Step 3
//   Animated.spring(     //Step 4
//       this.state.animation,
//       {
//           toValue: finalValue
//       }
//   ).start();  //Step 5
//   console.log(JSON.stringify(sectionData[0].key))
//   for(i=0;i<sectionData.length;i++){
//     console.log(JSON.stringify(sectionData[i].key)+": "+JSON.stringify(sectionData[i].data.length))
//   }
// }
//
// _setMaxHeight(){
//     this.setState({
//         maxHeight   : 60*3+30
//     });
// }
//
// _setMinHeight(event){
//     this.setState({
//         minHeight   : event.nativeEvent.layout.height
//     });
// }
