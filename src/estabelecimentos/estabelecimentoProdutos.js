
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, SectionList, TouchableOpacity, Animated, PixelRatio } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import {getEstabelecimentoProd, estabelecimentoProd, getEstabelecimentoTiposProd, estabelecimentoTiposProd, getEstabelecimentoProdutos} from '../firebase/database'
import EstabelecimentoProdutosListItem from './estabelecimentoProdutosListItem'
import Loader from '../loadingModal/loadingModal'

let sectionData =[]
let sectionName =[]

var tamanhoCelula = 60,
    tamanhoHeader = 30

import _ from 'lodash'

export class EstabelecimentoProdutosScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.nomeEstabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
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

  this.loadingTrue = this.loadingTrue.bind(this)
  this.loadingFalse = this.loadingFalse.bind(this)
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


renderSeparatorComponent = () => {
 return (<View style={styles.renderSeparatorComponent}/>);
};

renderSeparatorSection = () => {
  return (<View style={styles.renderSeparatorSection}/>);
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
  this.setState({
          loadingList: true
        });


  setTimeout(()=>{
    this.setState({produtosUp: estabelecimentoProd}, function(){
      this.sectionDataFunction(),
      this.setState({
              loadingList: false
            });
    })
  },750)

}

loadingTrue() {
  console.log("dentro loadingTrue")
  this.setState({loading:true})
}
loadingFalse() {
  console.log("dentro loadingFalse")
  this.setState({loading:false})
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
      navigation={this.props.navigation}
      loadingTrue = {this.loadingTrue}
      loadingFalse = {this.loadingFalse}>
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
      <View style={{height:30}} >
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
        >
            <Text style={styles.headerList}>{headerItem.section.key}</Text>

          </TouchableOpacity>
      </View>
    )
}

goToCarrinho(){
  const { navigate } = this.props.navigation;
    navigate('Carrinho')
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
        style={{marginLeft: 3, marginRight: 3}}
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
        {content}
      </Image>
    );
  }
}
