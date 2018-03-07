import React, { Component } from 'react';
import { Image, Alert, View, Text, TextInput, Button, ActivityIndicator, TouchableOpacity, FlatList, Icon, Dimensions, Picker } from 'react-native'
import { styles, cores } from '../constants/constants'
import {listaAdicionais, listaEstabelecimentos} from '../firebase/database'
import AdicionaisListItem from './adicionaisListItem'

import _ from 'lodash'
export var adicionaisEscolhidos= []
let totalPrice =0
var todoCounter = 1;

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
    adicionaisEscolhidos = []
    console.log("Adicionais:"+JSON.stringify(this.state.adicionais));
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
    // for(i=0;i<this.state.adicionais.length;i++){
    //   if(this.state.adicionais[i].quantidade>0){
    //       adicionaisEscolhidos.push({
    //         nome: this.state.adicionais[i].nome,
    //         preco: this.state.adicionais[i].preco,
    //         quantidade: this.state.adicionais[i].quantidade
    //       })
    //   }
    // }
    navigate('AddProduto',{adicionais:adicionaisEscolhidos, totalPreco: this.totalPrice})
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
    <Text>Preço total:{this.totalPrice}</Text>
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
