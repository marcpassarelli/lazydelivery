
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, SectionList, TouchableOpacity, Animated, PixelRatio } from 'react-native'
import { styles } from '../constants/constants'
import * as firebase from 'firebase';
import {getEstabelecimentoProd, estabelecimentoProd, getEstabelecimentoTiposProd, estabelecimentoTiposProd, getEstabelecimentoProdutos} from '../firebase/database'
import EstabelecimentoProdutosListItem from './estabelecimentoProdutosListItem'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'

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

  this.getItemLayout = sectionListGetItemLayout({
  // The height of the row with rowData at the given sectionIndex and rowIndex
  getItemHeight: (rowData, sectionIndex, rowIndex) => sectionIndex === 0 ? 100 : 50,

  // These three properties are optional
  getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
  getSectionHeaderHeight: () => 20, // The height of your section headers
  getSectionFooterHeight: () => 10, // The height of your section footers
})

  this.icons ={
    'up' : require('../../img/up.png'),
    'down' : require('../../img/down.png')
  }

  this.state = {
    nomeEstabelecimento:'',
    produtosUp:'',
    loading: false,
    expandido: false,
    animation: new Animated.Value()
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
      data: next,
      renderItem: this.renderItem
    })
    return acc
  }, [])


  console.log("depois reduce"+JSON.stringify(sectionData))

}

componentWillMount(){
  this.setState({
          loading: true
        });


  setTimeout(()=>{
    this.setState({produtosUp: estabelecimentoProd}, function(){
      this.sectionDataFunction(),
      this.setState({
              loading: false
            });
    })
  },750)

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
  let icon = this.icons['down'];
  if(this.state.expanded){
      icon = this.icons['up'];
  }
  // onLayout={this._setMinHeight.bind(this)}
  return  (
      <View style={{height:30}} >
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
        >
            <Text style={styles.headerList}>{headerItem.section.key}</Text>
            <Image
               style={{width:30, height: 25, marginRight:10}}
               source={icon}>
             </Image>
          </TouchableOpacity>
      </View>
    )
}



  render() {

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

      <SectionList
        style={{marginLeft: 3, marginRight: 3}}
        ItemSeparatorComponent={this.renderSeparatorComponent}
        SectionSeparatorComponent={this.renderSeparatorSection}
        renderSectionHeader={this.renderHeader}
        sections={sectionData}
        keyExtractor={(item) => item._id}
        getItemLayout={this.getItemLayout}
        />

    return (
      <Image
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        {content}
      </Image>
    );
  }
}
