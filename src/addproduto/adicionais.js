import React, { Component } from 'react';
import { ImageBackground, Image, View, Text, Button, FlatList } from 'react-native'
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
var imgProduto=""
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

  componentWillMount(){
    const {state} = this.props.navigation
    this.nome = state.params ? state.params.nome : ""
    this.preco = state.params ? state.params.preco : ""
    this.detalhes = state.params ? state.params.detalhes : ""
    this.imgProduto = state.params ? state.params.imgProduto : ""
    this.tipoProduto = state.params ? state.params.tipoProduto : ""
    console.log("listaAdicionais"+JSON.stringify(listaAdicionais));
    this.setState({
      adicionais: listaAdicionais
    });
  }

  adicionarAdicionais(){
    const { navigate } = this.props.navigation;
    const { state } = this.props.navigation;
    console.log("this.tipoProduto"+this.tipoProduto);
    var nomeEstabelecimento = state.params ? state.params.nomeEstabelecimento : ""

    adicionaisEscolhidos = []

    if(this.tipoProduto=="Pizzas"){

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
            _id:todoCounter++
          })
        }
      })
    }

    navigate('AddProduto',{
      adicionais:adicionaisEscolhidos,
      nomeEstabelecimento:nomeEstabelecimento,
      totalPreco: this.totalPrice,
      nome: this.nome,
      preco: this.preco,
      precoPizza: this.preco,
      detalhes:this.detalhes,
      imgProduto:this.imgProduto,
      tipoProduto:this.tipoProduto,
      telaAdicionais:true,
      tipoEstabelecimento: this.props.navigation.state.params.tipoEstabelecimento})
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
              if(this.tipoProduto=="Pizzas"){
                var str = (item.preco).toFixed(2)
                var res = str.toString().replace(".",",")
              }else{
                var str = (item.preco*item.quantidade).toFixed(2)
                var res = str.toString().replace(".",",")
              }

              return(
                  <Text style={[styles.textAdicionais],{alignSelf: 'center', fontSize: 18,
                    marginBottom: 10,
                    fontFamily:'Futura Medium Italic BT',color: cores.textDetalhes}}>R$ {res}</Text>
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
        styleText={{fontFamily:'Futura PT Bold',color:cores.corPrincipal, fontSize: 20}}
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


// refresh={()=>{
//   this.setState({
//     refresh: !this.state.refresh
//   },function(){
//     console.log("state.refresh"+this.state.refresh+" "+index);
//   });
// }}
