import React, { Component } from 'react';
import { ImageBackground, Image, View, Text, Button, FlatList,BackHandler } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import {listaAdicionais} from '../firebase/database'
import AdicionaisListItem from './adicionaisListItem'
import StatusBar from '../constants/statusBar'
import LazyActivity from '../loadingModal/lazyActivity'
import ListItemSeparator from '../constants/listItemSeparator'
import LazyBackButton from '../constants/lazyBackButton'
import _ from 'lodash'
import LazyYellowButton from '../constants/lazyYellowButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export var adicionaisEscolhidos= []
let totalPrice =0
var todoCounter = 1;

var nome=""
var preco=""
var detalhes=""
var tipoProduto=""

const adicionais = listaAdicionais

export class AdicionaisScreen extends Component{
  static navigationOptions = ({navigation}) => ({
    title: "ADICIONAIS",
    headerTitleStyle: [styles.headerText,{alignSelf:'center'}],
    headerStyle: styles.header,
    headerLeft: null,
    headerRight:null
  });

  constructor(props){
    super(props);
    this.state = {
      soma: 0,
      loading: false,
      adicionais,
      refresh:false,
      checkBoxChecked:''
    }

  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick=()=> {
    this.props.navigation.goBack();
    return true;
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    const {state} = this.props.navigation
    this.nome = state.params ? state.params.nome : ""
    this.preco = state.params ? state.params.preco : ""
    this.detalhes = state.params ? state.params.detalhes : ""

    this.tipoProduto = state.params ? state.params.tipoProduto : ""

    this.setState({
      adicionais: listaAdicionais
    });
  }

  adicionarAdicionais(){
    const { navigate } = this.props.navigation;
    const { state } = this.props.navigation;

    var nomeEstabelecimento = state.params ? state.params.nomeEstabelecimento : ""

    adicionaisEscolhidos = []

    if(this.tipoProduto=="Pizzas"||this.tipoProduto=="Pizzas Doces"){

      this.state.adicionais.map((item)=>{
        if(this.state.checkBoxChecked==item._id){
          this.totalPrice = item.preco
          adicionaisEscolhidos.push({
            nome: item.nome,
            preco: item.preco,
            quantidade: 1,
            _id:todoCounter++,
            tipoProduto: this.tipoProduto
          })
        }
      })

    }else{
      this.state.adicionais.map((item)=>{
        if (item.quantidade>0){
          adicionaisEscolhidos.push({
            nome: item.nome,
            preco: item.preco,
            quantidade: item.quantidade,
            tipoProduto: this.tipoProduto,
            _id:todoCounter++
          })
        }
      })
    }

    navigate({
      routeName: 'AddProduto',
      params:
      {
      adicionais:adicionaisEscolhidos,
      nomeEstabelecimento:nomeEstabelecimento,
      totalPreco: this.totalPrice,
      nome: this.nome,
      preco: this.preco,
      precoPizza: this.preco,
      detalhes:this.detalhes,
      tipoProduto:this.tipoProduto,
      telaAdicionais:true,
      tipoEstabelecimento: this.props.navigation.state.params.tipoEstabelecimento},
      key:Math.random () * 10000
    })
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

  onCheckBoxPress = (id) => {
    if(this.state.checkBoxChecked==id) {
      this.setState({
        checkBoxChecked: 100000
      });
    }else{
      this.setState({
        checkBoxChecked: id
      });
    }
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
      <LazyActivity/>
    </View> :

    <View style={{flex: 1}}>
      <StatusBar/>
      <FlatList
        ItemSeparatorComponent={ListItemSeparator}
        data= {this.state.adicionais}
        extraData={this.state.checkBoxChecked}
        renderItem={({ item, index }) => (
          <AdicionaisListItem
            item={item}
            tipoProduto={this.tipoProduto}
            preco={() => {
              if(this.tipoProduto=="Pizzas"||this.tipoProduto=="Pizzas Doces"){
                var str = (item.preco).toFixed(2)
                var res = str.toString().replace(".",",")
              }else{
                var str = (item.preco*item.quantidade).toFixed(2)
                var res = str.toString().replace(".",",")
              }

              return(
                  <Text style={[styles.textAdicionais],{alignSelf: 'center', fontSize: wp('4.5%'),
                    marginBottom: hp('1.11%'),
                    fontFamily:'FuturaBT-MediumItalic',color: cores.textDetalhes}}>R$ {res}</Text>
              )
            }}

            checkBoxChecked ={this.state.checkBoxChecked==item._id ? true : false}
            onCheckBoxPress={() => this.onCheckBoxPress(item._id)}

            onSubtract={() => this.onSubtract(item, index)}
            onAdd={() => this.onAdd(item, index)}
          />
        )}
        keyExtractor={item => item._id.toString()}
      />
      <LazyYellowButton
        styleButton={{width: wp('100%')}}
        styleText={{fontFamily:'FuturaPT-Bold',color:cores.corPrincipal, fontSize: wp('5%')}}
        onPress={()=>{this.adicionarAdicionais()}}
        text={"VOLTAR / ADICIONAR"}
        />
    </View>

    return (
      <ImageBackground
        source={images.imageBackground}
        style={[styles.backgroundImage]}>
        {content}
      </ImageBackground>
    );
  }
}
