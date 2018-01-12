
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, TouchableOpacity, FlatList, Icon, Dimensions, Picker } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import {getListaEstabelecimentos, listaEstabelecimentos} from '../firebase/database'

import _ from 'lodash'

var options =["Home R$ 5,00","Savings","Car","GirlFriend"];

export class AddProdutoScreen extends Component{

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.estabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>)
  });

  constructor(props){
    super(props);
    this.state = {
      nome:'',
      preco:'',
      detalhes:'',
      imgProduto:'',
      qtde:'',
      adicionais:'',
      listaAdicionais:'',
      loading: false
    }

  updateAdicionais = (adicionais) => {
   this.setState({ adicionais: adicionais })
  }
}

  componentWillMount(){

    const {state} = this.props.navigation
    var nome = state.params ? state.params.nome : ""
    var preco = state.params ? state.params.preco : ""
    var detalhes = state.params ? state.params.detalhes : ""
    var imgProduto = state.params ? state.params.imgProduto : ""
    var tipoProduto = state.params ? state.params.tipo : ""

    console.log("tipoProduto: "+tipoProduto)

    this.setState({
      loading: true,
      nome: nome,
      preco: preco,
      detalhes: detalhes,
      imgProduto: imgProduto
    }, function(){
        this.setState({
          loading: false
        })
        console.log("state: "+this.state.imgProduto)
    });

  }

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
    var {width, height} = Dimensions.get('window');


    const content = this.state.loading ?

    <View style={styles.containerIndicator}>
      <ActivityIndicator
        color = '#8b0000'
        size="large"
        style = {styles.activityIndicator}/>
    </View> :

    <View>
      <Image
        source={{uri:this.state.imgProduto}}
        style={[styles.imgProduto,{width: width*0.98, height: height*0.3}]}>
      </Image>
      <Text style={styles.textAddProduto}>
          {this.state.nome}
      </Text>
      <Text style={styles.textAddProduto}>
        Preço Unitário: R$ {this.state.preco*this.state.qtde}
      </Text>
      <View style={{flex:1, flexDirection: 'row', marginVertical: 15}}>
        <Text style={styles.textAddProduto}>Quantidade:</Text>
        <TouchableOpacity style={{flex:1}} onPress={()=>{}}>
          <Text style={styles.textAddProduto}>-</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.textAddProduto,{fontSize: 14, marginLeft: 5}]}>
        {this.state.detalhes}
      </Text>
      <TouchableOpacity>
        <Text style={[styles.textAddProduto,{marginBottom: 10,textDecorationLine:'underline'}]}>
          Adicionais?
        </Text>
      </TouchableOpacity>
      <Text style={styles.textAddProduto}>Observações</Text>
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
// <Picker
//   style={{width: width*0.9, alignSelf: 'center'}}
//   selectedValue={this.state.adicionais}
//   onValueChange={(itemValue, itemIndex) => this.setState({adicionais: itemValue})}>
//   {options.map((item, index) => {
//     return (
//       <Picker.Item
//       label={item} value={index} key={index}/>
//     )
//   })}
// </Picker>
