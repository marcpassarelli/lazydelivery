
import React, { Component } from 'react';
import { Platform, BackHandler, Image, View, Text,TextInput, Button, ActivityIndicator, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import * as firebase from 'firebase';
import {getListaAdicionais, listaAdicionais} from '../firebase/database'
import {adicionaisEscolhidos} from './adicionais'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from '../loadingModal/loadingModal';
import StatusBar from '../constants/statusBar'
import { AndroidBackHandler } from 'react-navigation-backhandler';

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
      imageLoaded: true,
      loadingAfter: false,
      obs:'',
      tipoEstabelecimento:''
    }

  updateAdicionais = (adicionais) => {
   this.setState({ adicionais: adicionais })
  }
}

  componentWillMount(){

    const {state} = this.props.navigation

    var nome = state.params ? state.params.nome : ""
    var preco = state.params.tipoProduto=="Pizzas" ? state.params.precoPizza : state.params.preco
    var detalhes = state.params ? state.params.detalhes : ""
    var imgProduto = state.params ? state.params.imgProduto : ""
    var tipoProduto = state.params ? state.params.tipoProduto : ""

    var estabelecimento = state.params ? state.params.nomeEstabelecimento : ""

    var telaAdicionais = state.params ? state.params.telaAdicionais : ""
    var tipoEstabelecimento = state.params ? state.params.tipoEstabelecimento : ""
    this.totalPrice = state.params ? state.params.totalPreco : ""


    //Se tiver vindo da lista de produtos zerará os adicionais
    if(!telaAdicionais){
      this.setState({
        listaAdicionais: []
      });
    }
    console.log("estabelecimento "+estabelecimento+"/ tipoProduto"+tipoProduto);
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
    },function(){
      this.setState({
        loading:false
      });
    });

  }

  menosQtde(){
    let qtde = this.state.qtde
    if(qtde>0){
      let qtde = this.state.qtde
      qtde = qtde - 1
      let preco = parseFloat(this.state.preco)
      let total = (qtde*preco).toFixed(2)
      this.setState({
        qtde: qtde,
      }, function(){
        this.setState({
          total: total
        });
      });
    }
  }

  maisQtde(){
    let qtde = this.state.qtde
    qtde = qtde + 1
    let preco = parseFloat(this.state.preco)
    let total = (qtde*preco).toFixed(2)

    this.setState({
      qtde: qtde
    }, function(){
      this.setState({
        total: total
      });
    });
  }

  adicionarAoCarrinho(){
    this.setState({
      loadingAfter:true
    });
    const {state} = this.props.navigation
    var estabelecimento = state.params ? state.params.nomeEstabelecimento : ""


    carrinho.push({
      nome:this.state.nome,
      preco:this.state.preco,
      quantidade:this.state.qtde,
      obs:this.state.obs,
      detalhes:this.state.detalhes,
      adicional:false,
      tag: tag,
      _id:todoCounter++,
      tipoProduto:this.state.tipoProduto
    })


    this.state.listaAdicionais.map((item, i, arr)=>{
          if(arr.length > 0 ){

            carrinho.push({
              nome: item.nome,
              preco: item.preco,
              quantidade: item.quantidade,
              obs:"",
              adicional:true,
              _id:todoCounter++,
              tag:tag,
              tipoProduto:item.tipoProduto
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


    if(this.tipoProduto="Pizzas"&&this.totalPrice>=0){
      return(
      <View style={{flex:1}}>
        <Text style={[styles.textAddProduto,{fontSize: 12}]}>Valor Adicionais: R${this.totalPrice}</Text>
        <Text style={styles.textAddProduto}>Total com Adicionais: R$ {total}</Text>
      </View>
      )
    }else if(this.totalPrice>=0) {
      return(
      <View style={{flex:1}}>
        <Text style={[styles.textAddProduto,{fontSize: 12}]}>Valor Adicionais: R${this.totalPrice}</Text>
        <Text style={styles.textAddProduto}>Total com Adicionais: R$ {total}</Text>
      </View>
      )
    }
  }

  valorVirgula(valor){

    var str = parseFloat(valor)
    str = (str).toFixed(2)
    var res = str.toString().replace(".",",")
    return(
        <Text style={styles.textAddProduto}>{res}</Text>
    )
  }


  handleImageLoaded() {

   this.setState({ loading: false });
 }

 onBackButtonPressAndroid = () =>{
   const {navigate} = this.props.navigation
   const {state} = this.props.navigation
   navigate('Estabelecimento',
   {nomeEstabelecimento:state.params.nomeEstabelecimento,
   tipoEstabelecimento: state.params.tipoEstabelecimento})
   return true
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

    <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
    <View style={{flex: 1}}>
      <StatusBar/>
      <ScrollView>
        {this.state.imgProduto ?
          <Image
            source={{uri:this.state.imgProduto}}
            onLoadEnd={()=>{this.setState({
              imageLoaded: false
            });}}
            style={[styles.imgProduto,{width: width*0.98, height: height*0.3}]}>
          </Image>
          :
          <View style={{marginTop: 10}}></View>
        }

        <Text style={[styles.textAddProduto,{marginBottom: 0}]}>
            {this.state.nome}
        </Text>

        <Text style={[styles.textAddProduto,{fontSize: 13, marginHorizontal: 10,color: '#2F4F4F'}]}>
          {this.state.detalhes}
        </Text>

        <Text style={styles.textAddProduto}>
          Preço Unitário: R$ {this.valorVirgula(this.state.preco)}
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
          Total: R$ {this.valorVirgula(this.state.total)}
        </Text>
        {listaAdicionais.length>0 ?
        <TouchableOpacity onPress={()=>{
            console.log("this.state.tipoProduto"+this.state.tipoProduto);
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
        :
        <View onLayout={()=>{
            this.setState({
              imageLoaded: false
            });
          }}></View>
      }
        <Text style={[styles.textAddProduto,{fontSize: 12}]}>{
            this.state.tipoProduto == "Pizzas" ?
              this.state.listaAdicionais.map((item,i)=>{
                return <Text key={i}>{item.nome}</Text>
              })
            :
            this.state.listaAdicionais.map((item, i, arr)=>{
                if(arr.length === i + 1 ){
                  return (<Text key={i}>{item.quantidade}x {item.nome} (R$ {item.preco*item.quantidade})</Text>)
                }else{
                  return (<Text key={i}>{item.quantidade}x {item.nome} (R$ {item.preco*item.quantidade}), </Text>)
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
    </AndroidBackHandler>

    return (
      <Image
        source={images.imageBackground}
        style={styles.backgroundImage}>
        <Loader
          loading={this.state.loadingAfter}/>
        <KeyboardAwareScrollView>
          {content}
        </KeyboardAwareScrollView>
        <View>
          <Button
            style={{position: 'absolute', left: 0, right: 0, bottom: 0}}
            disabled={this.state.imageLoaded}
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
