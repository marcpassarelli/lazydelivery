
import React, { Component } from 'react';
import { Platform, BackHandler, Image, Alert, View, Text,TextInput, Button, ActivityIndicator, TouchableOpacity, FlatList, Dimensions, Picker, ScrollView } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import {getListaEstabelecimentos, listaEstabelecimentos, getListaAdicionais} from '../firebase/database'
import {adicionaisEscolhidos} from './adicionais'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import _ from 'lodash'
import Loader from '../loadingModal/loadingModal';
import StatusBar from '../constants/statusBar'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

let listener = null
export var carrinho =[]
var todoCounter = 1;
var totalPrice=0;
var tag=0

export function atualizarCarrinho(carrinhoAtualizado){
  carrinho = carrinhoAtualizado
}

export class AddProdutoScreen extends Component{

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
          navigation.navigate('Estabelecimento',
          {nomeEstabelecimento:navigation.state.params.nomeEstabelecimento,
          tipoEstabelecimento: navigation.state.params.tipoEstabelecimento})
          }}>
        </Icon>
      ),
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
      listaAdicionais: adicionaisEscolhidos,
      loading: false,
      loadingAfter: false,
      obs:'',
      tipoEstabelecimento:''
    }

  updateAdicionais = (adicionais) => {
   this.setState({ adicionais: adicionais })
  }
}

  componentDidMount(){
    if (Platform.OS == "android" && listener == null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        this.props.navigation('')
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
    var tipoProduto = state.params ? state.params.tipoProduto : ""
    var estabelecimento = state.params ? state.params.nomeEstabelecimento : ""
    var telaAdicionais = state.params ? state.params.telaAdicionais : ""
    var tipoEstabelecimento = state.params ? state.params.tipoEstabelecimento : ""

    if(!telaAdicionais){
      this.setState({
        listaAdicionais: []
      });
    }

    console.log("estabelecimento: "+estabelecimento+"tipoProduto: "+tipoProduto);
    getListaAdicionais(estabelecimento, tipoProduto)

    this.setState({
      loading: true,
      nome: nome,
      preco: preco,
      detalhes: detalhes,
      imgProduto: imgProduto,
      tipoProduto: tipoProduto,
      total: preco,
      estabelecimento: estabelecimento,
      tipoEstabelecimento: tipoEstabelecimento
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
    this.setState({
      loadingAfter:true
    });
    const {state} = this.props.navigation
    var estabelecimento = state.params ? state.params.nomeEstabelecimento : ""
    console.log("nome: "+this.state.nome+" preco: "+this.state.preco+" qtde: "+this.state.qtde)
    carrinho.push({
      nome:this.state.nome,
      preco:this.state.preco,
      quantidade:this.state.qtde,
      obs:this.state.obs,
      adicional:false,
      tag: tag,
      _id:todoCounter++
    })


    this.state.listaAdicionais.map((item, i, arr)=>{
          if(arr.length > 0 ){
            console.log("nome: "+item.nome+" preco: "+item.preco+" qtde: "+item.qtde);
            carrinho.push({
              nome: item.nome,
              preco: item.preco,
              quantidade: item.quantidade,
              obs:"",
              adicional:true,
              _id:todoCounter++,
              tag:tag
            })
          }
    })

    const { navigate } = this.props.navigation;
    navigate('Estabelecimento',{toast:this.state.nome, nomeEstabelecimento: estabelecimento,
  tipoEstabelecimento: state.params.tipoEstabelecimento })
  this.setState({
    loadingAfter:false
  })
    tag++
  }

  checkAdicionais(){
    var total = parseFloat(this.state.total) + parseFloat(this.totalPrice)

    if(this.totalPrice>0){
      return(
      <View style={{flex:1}}>
        <Text style={[styles.textAddProduto,{fontSize: 12}]}>Valor Adicionais: R${this.totalPrice}</Text>
        <Text style={styles.textAddProduto}>Total com Adicionais: R$ {total}</Text>
      </View>
      )
    }else {
      return <Text></Text>
    }
  }

  render() {
    const {state} = this.props.navigation
    console.ignoredYellowBox = [
      'Setting a timer'
    ];



    var {width, height} = Dimensions.get('window');

    const content = this.state.loading ?

    <View style={styles.containerIndicator}>
      <ActivityIndicator
        color = '#8b0000'
        size="large"
        style = {styles.activityIndicator}/>
    </View> :

    <View style={{flex: 1}}>
      <StatusBar/>
      <ScrollView>
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
                  imgProduto:this.state.imgProduto,
                  tipoProduto:this.state.tipoProduto,
                  nomeEstabelecimento: this.state.estabelecimento,
                  tipoEstabelecimento: this.state.tipoEstabelecimento})
          }}>
          <Text style={[styles.textAddProduto,{marginBottom: 10,textDecorationLine:'underline'}]}>
            Adicionais?
          </Text>
        </TouchableOpacity>

        <Text style={[styles.textAddProduto,{fontSize: 12}]}>{
            this.state.listaAdicionais.map((item, i, arr)=>{
                  if(arr.length === i + 1 ){
                    return (<Text key={i}>{item.nome} ({item.quantidade})</Text>)
                  }else{
                    return (<Text key={i}>{item.nome} ({item.quantidade}), </Text>)
                  }
                })
              }
        </Text>
        <View>
          {this.checkAdicionais()}
        </View>
        <Text></Text>

        <Text style={[styles.textAddProduto,{marginBottom: 0, alignSelf: 'flex-start'}]}>Observações:</Text>
        <TextInput
          style={{}}
          multiline = {true}
          onChangeText={(text) => this.setState({obs: text})}
          value={this.state.obs}
          placeholder='Exemplos: Carne bem passada. Sem cebola. Sem salada, etc...'
          >
        </TextInput>
      </ScrollView>
    </View>

    return (
      <Image
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        <Loader
          loading={this.state.loadingAfter}/>
        <KeyboardAwareScrollView>
          {content}
        </KeyboardAwareScrollView>
        <View>
          <Button
            style={{position: 'absolute', left: 0, right: 0, bottom: 0}}
            onPress={()=>{this.adicionarAoCarrinho()}}
            title="Adicionar ao Carrinho"
            color={cores.corPrincipal}
            accessibilityLabel="YourLabelHere"
          />
        </View>
      </Image>
    );
  }
}
