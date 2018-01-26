import React, { Component } from 'react';
import { Image, Alert, View, Text,TextInput, Button, ActivityIndicator, TouchableOpacity, FlatList, Icon, Dimensions, Picker } from 'react-native'
import { styles, cores } from '../constants/constants'
import {listaAdicionais, listaEstabelecimentos} from '../firebase/database'
import AdicionaisListItem from './adicionaisListItem'

import _ from 'lodash'
var soma = 0
var carrinho = []

export class AdicionaisScreen extends Component{

  static navigationOptions = ({navigation}) => ({
    title: "Adicionais",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>)
  });

  constructor(props){
    super(props);
    this.state = {
      soma: 0,
      loading: false
    }

  }

  componentWillMount(){
    this.setState({
            loading: true
          });

    setTimeout(()=>{
      this.setState({listaAdicionais: listaAdicionais}, function(){
        this.setState({
                loading: false
              });
      })
    },500)

  }

  getSum(total, num) {
    return total + num
  }

  renderItem = (item) =>{

    console.log("LISTA ADICIONAIS RENDERITEM"+JSON.stringify(soma));
    // onLayout={this._setMaxHeight.bind(t  his)}
    return (
      <AdicionaisListItem
        nomeAdicional = {item.item.nome}
        preco = {item.item.preco}>
      </AdicionaisListItem>
    )
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
      navigate('AddProduto')
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

    <View style={{flex: 1}}>
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        data= {this.state.listaAdicionais}
        extraData={this.state}
        renderItem={this.renderItem}
        keyExtractor={item => item.nome}
      />
    <Text>Total={this.state.soma}</Text>
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
