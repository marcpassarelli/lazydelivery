
import React, { Component } from 'react';
import { Platform, BackHandler, Image, Alert, View, Text,TextInput, Button, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, Picker } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import {getListaEstabelecimentos, listaEstabelecimentos, getListaAdicionais} from '../firebase/database'
import {adicionaisEscolhidos} from './adicionais'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import _ from 'lodash'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

let listener = null
export var carrinho =[]
// export var produtopra
var todoCounter = 1;
var totalPrice=0;

export class AddProdutoScreen extends Component{

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.estabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerLeft: (<Icon style={{marginLeft: 15}} name={'arrow-left'} size={26} color="#000000" onPress={()=>{navigation.navigate('Estabelecimento',{nomeEstabelecimento:navigation.state.params.estabelecimento})}}></Icon>),
    headerRight: (<View></View>)
  });

  constructor(props){
    super(props);
    this.state = {
      nome:'',
      preco:'',
      detalhes:'',
      imgProduto:'',
      tipoProduto:'',
      estabelecimento:'',
      qtde:1,
      total:'',
      listaAdicionais:'',
      loading: false,
      obs:''
    }

  updateAdicionais = (adicionais) => {
   this.setState({ adicionais: adicionais })
  }
}

  componentDidMount(){
    if (Platform.OS == "android" && listener == null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        BackHandler.exitApp()
      })
    }
  }

  componentWillMount(){

    const {state} = this.props.navigation
    this.totalPrice = state.params ? state.params.totalPreco : ""
    var nome = state.params ? state.params.nome : ""
    var preco = state.params ? state.params.preco : ""
    var detalhes = state.params ? state.params.detalhes : ""
    var imgProduto = state.params ? state.params.imgProduto : ""
    var tipoProduto = state.params ? state.params.tipo : ""

    this.setState({
      loading: true,
      nome: nome,
      preco: preco,
      detalhes: detalhes,
      imgProduto: imgProduto,
      tipoProduto: tipoProduto,
      total: preco
    }, function(){
        this.setState({
          loading: false
        })
    });

  }

  menosQtde(){
    let qtde = this.state.qtde
    if(qtde>0){
      this.setState({
        qtde: qtde - 1,
      }, function(){
        this.setState({
          total: this.state.qtde*this.state.preco
        });
      });
    }
  }

  maisQtde(){
    let qtde = this.state.qtde + 1
    this.setState({
      qtde: qtde
    }, function(){
      this.setState({
        total: this.state.qtde*this.state.preco
      });
    });
  }

  adicionarAoCarrinho(){
    carrinho.push({
      nome:this.state.nome,
      preco:this.state.preco,
      qtde:this.state.qtde,
      obs:this.state.obs,
      adicionais: adicionaisEscolhidos,
      _id:todoCounter++
    })
    const { navigate } = this.props.navigation;
    navigate('Carrinho')
  }

  checkAdicionais(){
    if(this.totalPrice>0){
      return <Text>Valor Adicionais: R${this.totalPrice}</Text>
    }else {
      return <Text></Text>
    }
  }

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ];



    var {width, height} = Dimensions.get('window');
    // const adicionaisEscolhidosLength = adicionaisEscolhidos.length

    const content = this.state.loading ?

    <View style={styles.containerIndicator}>
      <ActivityIndicator
        color = '#8b0000'
        size="large"
        style = {styles.activityIndicator}/>
    </View> :

    <View style={{flex: 1}}>

      <Image
        source={{uri:this.state.imgProduto}}
        style={[styles.imgProduto,{width: width*0.98, height: height*0.3}]}>
      </Image>

      <Text style={[styles.textAddProduto,{marginBottom: 0}]}>
          {this.state.nome}
      </Text>

      <Text style={[styles.textAddProduto,{fontSize: 13, marginHorizontal: 10,color: '#2F4F4F'}]}>
        {this.state.detalhes}
      </Text>

      <Text style={styles.textAddProduto}>
        Preço Unitário: R$ {this.state.preco}
      </Text>

      <Text style={[styles.textAddProduto,{marginBottom: 5}]}>Quantidade:</Text>

      <View style={{flexDirection: 'row', alignSelf: 'center'}}>

        <TouchableOpacity style={{}} onPress={()=>{this.menosQtde()}}>
          <Image source={require('../../img/minus.png')} style={styles.icon}/>
        </TouchableOpacity>

        <Text style={[styles.textAddProduto, {marginHorizontal: 10, fontSize: 16}]}>{this.state.qtde}</Text>

        <TouchableOpacity style={{}} onPress={()=>{this.maisQtde()}}>
          <Image source={require('../../img/plus.png')} style={styles.icon}/>
        </TouchableOpacity>

      </View>

      <Text style={styles.textAddProduto}>
        Total: R$ {this.state.total}
      </Text>

      <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Adicionais',{nome:this.state.nome,
                preco:this.state.preco,
                detalhes:this.state.detalhes,
                imgProduto:this.state.imgProduto})
        }}>
        <Text style={[styles.textAddProduto,{marginBottom: 10,textDecorationLine:'underline'}]}>
          Adicionais?
        </Text>
      </TouchableOpacity>

      <Text style={[styles.textAddProduto,{fontSize: 12}]}>{
          adicionaisEscolhidos.map((item, i, arr)=>{
                if(arr.length === i + 1 ){
                  return (<Text key={i}>{item.nome} ({item.quantidade})</Text>)
                }else{
                  return (<Text key={i}>{item.nome} ({item.quantidade}), </Text>)
                }
              })
            }
      </Text>
      <Text style={[styles.textAddProduto,{fontSize:12}]}>
        {this.checkAdicionais()}
      </Text>
      <Text></Text>

      <Text style={[styles.textAddProduto,{marginBottom: 0, alignSelf: 'flex-start'}]}>Observações:</Text>
      <TextInput
        style={{borderColor: cores.corPrincipal, borderWidth: 0.5, marginBottom: 5}}
        multiline = {true}
        onChangeText={(text) => this.setState({obs: text})}
        value={this.state.obs}
        placeholder='Exemplos: Carne bem passada. Sem cebola. Sem salada, etc...'
        >
      </TextInput>

      <Button
        onPress={()=>{this.adicionarAoCarrinho()}}
        title="Adicionar ao Carrinho"
        color={cores.corPrincipal}
        accessibilityLabel="YourLabelHere"
      />

    </View>

    return (
      <Image
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        <KeyboardAwareScrollView>
          {content}
        </KeyboardAwareScrollView>
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
