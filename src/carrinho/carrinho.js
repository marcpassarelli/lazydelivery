
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList, Icon } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import {getListaEstabelecimentos, listaEstabelecimentos} from '../firebase/database'
import {carrinho} from '../addproduto/addproduto'
import CarrinhoListItem from './carrinhoListItem'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import _ from 'lodash'

export class CarrinhoScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: "Carrinho",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>)
  });

  constructor(props){
    super(props);
    this.state = {
      tipoEstabelecimento:'',
      listaEstabelecimentosUp:'',
      loading: false,

    }
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


  componentWillMount(){
    console.log("carrinho: "+JSON.stringify(carrinho));

    this.setState({
      loading: true
    })

    const {state} = this.props.navigation;
    var tipoEstabelecimentoUp = state.params ? state.params.tipoEstabelecimento : ""

  }

  componentDidMount(){
    console.log("antes check did mount"+JSON.stringify(carrinho))
    this.setState({ listaEstabelecimentosUp: listaEstabelecimentos}, function(){
      setTimeout(()=>{
        this.setState({
          loading: false
        })
      },500);
    })


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

    <View style={{flex:1}}>
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        data= {carrinho}
        extraData={this.state}
        renderItem={({item}) =>
        <CarrinhoListItem
            item={item}
            onSubtract={() => this.onSubtract(item, index)}
            onAdd={() => this.onAdd(item, index)}>
        </CarrinhoListItem>}
        keyExtractor={item => item._id}
      />
    </View>

    return (
      <Image
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.separator}></View>
        {content}
      </Image>
    );
  }
}
