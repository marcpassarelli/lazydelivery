import React, { Component } from 'react';
import { ImageBackground, Platform, Image, Alert, View, Text, Button, FlatList,BackHandler,TouchableOpacity } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import {getTiposItens,listaTipoItens} from '../firebase/database'
import LazyActivity from '../loadingModal/lazyActivity'
import Icon from 'react-native-vector-icons/Feather';
import StatusBar from '../constants/statusBar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ListItemSeparator from '../constants/listItemSeparator'
import LazyBackButton from '../constants/lazyBackButton'
import LazyYellowButton from '../constants/lazyYellowButton'
import AntesAddProdutoListItem from './antesAddProdutoListItem'
import { NavigationActions } from 'react-navigation';

import _ from 'lodash';

var qtdePaginas= ""
var tipoPagina=""
var qtdeItens=""
var tipoItens=""
var pagAtual=0
var qtdeSabores=""
let totalItens =0
let totalSabores=0
let sortidos=false
var qtdeMaxima=[]
let tipoItensArray=[]

export class AntesAddProdutoScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerTitleStyle: [styles.headerText,{textAlign: 'center',marginRight:20}],
    headerStyle: styles.header,
    headerLeft: (
      <View style={{}}>
        <LazyBackButton
          goBack={()=>{
            navigation.push('Estabelecimento',
            {nomeEstabelecimento:navigation.state.params.nomeEstabelecimento,
            tipoEstabelecimento: navigation.state.params.tipoEstabelecimento})
            }}/>
      </View>
    )
  });

constructor(props){
  super(props);

  this.state = {
    nomeEstabelecimento:'',
    produtosUp:'',
    loadingList: false,
    loading: false,
    listaItens:[],
    qtdeSabores:0,
    checkBoxSortidos:false,
    checkBoxChecked:100000
  }

  this.onAdd = this.onAdd.bind(this);


}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick=()=> {
  this.props.navigation.dispatch(NavigationActions.back());
  return true;
}


componentWillMount(){
   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  this.setState({
          loadingList: true
        });
  const {state} = this.props.navigation

  var estabelecimento = state.params ? state.params.nomeEstabelecimento : ""
  this.paginas = state.params ? state.params.paginas : ""
  this.pagAtual= state.params.pagAtual

  this.qtdePaginas = this.paginas.length
  this.tipoPagina = this.paginas[this.pagAtual-1].tipoPagina
  this.tipoItens = this.paginas[this.pagAtual-1].tipoItens
  this.qtdeItens= this.paginas[this.pagAtual-1].qtdeItens
  this.qtdeSabores = this.paginas[this.pagAtual-1].qtdeSabores
  this.sortidos = this.paginas[this.pagAtual-1].sortidos


  // this.tipoItensArray = this.tipoItens.split(",")
  let listaItens = []
  const requests = this.tipoItens.map((item,index)=>{
    getTiposItens(estabelecimento,item.nome,()=>{
      if(this.tipoItens.length==index+1){
        this.setState({
          listaItens:listaTipoItens
        },function(){
          this.setState({
            loadingList: false
          },function(){

          });
        });
      }

    })
  })

}

onSubtract = (item, index) =>{
const listaItens = [...this.state.listaItens];
  if(listaItens[index].quantidade>0){
    listaItens[index].quantidade -= 1;
  }
  this.setState({ listaItens });
}

onSubtractDez = (item, index) =>{
const listaItens = [...this.state.listaItens];
  if(listaItens[index].quantidade>10){
    listaItens[index].quantidade -= 10;
  }else{
    listaItens[index].quantidade = 0;
  }
  this.setState({ listaItens });
}

onAddDez = (item, index) =>{

    const listaItens = [...this.state.listaItens];
    let indexOf = this.tipoItens.map(function(e) { return e.nome; }).indexOf(item.tipoItem)
    // definir que tipo de sabor está sendo aumentado
    // definir a qtdeMaxima do tipo de sabor que está sendo aumentado

    if(this.state.checkBoxSortidos){
      Alert.alert(
       'Opções Sabores Sortidos Marcada',
       'Desmarque a opção de sabores sortidos caso queira definir as quantidades de cada sabor',
       [
         {text: 'OK', onPress: () => {

         }},
       ],
       { cancelable: false }
     )
   }else{
    //verificar se atingiu a quantidade maxima de sabores
    if(this.totalSabores==this.qtdeSabores){
      // caso já tenha atingido o maximo de qtdeSabores mas estiver aumentando algum sabor que já tenha mais de um
      if(listaItens[index].quantidade>0){
        //verifica caso já tenha atingido o limite de itens
        if(this.totalItens+9<this.qtdeItens){
          if(this.tipoItens[indexOf].qtdeMaxima){
            if(this.tipoItens[indexOf].qtdeAtual+9 < this.tipoItens[indexOf].qtdeMaxima){

              listaItens[index].quantidade += 10;
            }else{
              Alert.alert(
               'Quantidade Máxima de '+item.tipoItem+' atingida.',
               'Se adicionar 10 você excederá a quantidade máxima permitida ('+this.tipoItens[indexOf].qtdeMaxima+') de '+item.tipoItem+'.',
               [
                 {text: 'OK', onPress: () => {

                 }},
               ],
               { cancelable: false }
             )
            }
          }else{

            listaItens[index].quantidade += 10;
          }
        }else{
          Alert.alert(
           'Quantidade Máxima Permitida',
           'Se adicionar 10 você excederá a quantidade máxima permitida.',
           [
             {text: 'OK', onPress: () => {

             }},
           ],
           { cancelable: false }
         )
        }
      }else{
      Alert.alert(
       'Quantidade Máxima de Sabores',
       'Já atingiu a quantidade máxima de sabores.',
       [
         {text: 'OK', onPress: () => {

         }},
       ],
       { cancelable: false }
     )}
       //verifica caso já tenha atingido o limite de itens
    }else if(this.totalItens+9<this.qtdeItens){
      if(this.tipoItens[indexOf].qtdeMaxima){
        if(this.tipoItens[indexOf].qtdeAtual+9 < this.tipoItens[indexOf].qtdeMaxima){
          listaItens[index].quantidade += 10;

        }else{
          Alert.alert(
           'Quantidade Máxima de '+item.tipoItem+' atingida.',
           'Se adicionar 10 você excederá a quantidade máxima permitida ('+this.tipoItens[indexOf].qtdeMaxima+') de '+item.tipoItem+'.',
           [
             {text: 'OK', onPress: () => {

             }},
           ],
           { cancelable: false }
         )
        }
      }else{
        listaItens[index].quantidade += 10;

      }
    }else{
      Alert.alert(
       'Quantidade Máxima Permitida',
       'Se adicionar 10 você excederá a quantidade máxima permitida.',
       [
         {text: 'OK', onPress: () => {

         }},
       ],
       { cancelable: false }
     )
    }}


    this.setState({ listaItens });
}


onAdd = (item, index) =>{
  const listaItens = [...this.state.listaItens];

  //verifica index do array tipoItens para pegar a quantidade maxima
  let indexOf = this.tipoItens.map(function(e) { return e.nome; }).indexOf(item.tipoItem)

  // definir que tipo de sabor está sendo aumentado
  // definir a qtdeMaxima do tipo de sabor que está sendo aumentado
  if(this.state.checkBoxSortidos){
    Alert.alert(
     'Opções Sabores Sortidos Marcada',
     'Desmarque a opção de sabores sortidos caso queira definir as quantidades de cada sabor',
     [
       {text: 'OK', onPress: () => {

       }},
     ],
     { cancelable: false }
   )
 }else{

  //verificar se atingiu a quantidade maxima de sabores
  if(this.totalSabores==this.qtdeSabores){
    // caso já tenha atingido o maximo de qtdeSabores mas estiver aumentando algum sabor que já tenha mais de um
    if(listaItens[index].quantidade>0){
      //verifica caso já tenha atingido o limite de itens
      if(this.totalItens<this.qtdeItens){
        if(this.tipoItens[indexOf].qtdeMaxima){
          if(this.tipoItens[indexOf].qtdeAtual < this.tipoItens[indexOf].qtdeMaxima){
            listaItens[index].quantidade += 1;
          }else{
            Alert.alert(
             'Quantidade Máxima de '+item.tipoItem+' atingida.',
             'Já atingiu a quantidade máxima permitida ('+this.tipoItens[indexOf].qtdeMaxima+') de '+item.tipoItem+'. Escolha outro sabor.',
             [
               {text: 'OK', onPress: () => {

               }},
             ],
             { cancelable: false }
           )
          }
        }else{
          listaItens[index].quantidade += 1;

        }
      }else{
        Alert.alert(
         'Quantidade Máxima Permitida',
         'Já atingiu a quantidade máxima.',
         [
           {text: 'OK', onPress: () => {

           }},
         ],
         { cancelable: false }
       )
      }
    }else{
    Alert.alert(
     'Quantidade Máxima de Sabores',
     'Já atingiu a quantidade máxima de sabores.',
     [
       {text: 'OK', onPress: () => {

       }},
     ],
     { cancelable: false }
   )}
     //verifica caso já tenha atingido o limite de itens
  }else if(this.totalItens<this.qtdeItens){

    if(this.tipoItens[indexOf].qtdeMaxima){
      if(this.tipoItens[indexOf].qtdeAtual < this.tipoItens[indexOf].qtdeMaxima){
        listaItens[index].quantidade += 1;

      }else{
        Alert.alert(
         'Quantidade Máxima de '+item.tipoItem+' atingida.',
         'Já atingiu a quantidade máxima permitida ('+this.tipoItens[indexOf].qtdeMaxima+') de '+item.tipoItem+'. Escolha outro sabor.',
         [
           {text: 'OK', onPress: () => {

           }},
         ],
         { cancelable: false }
       )
      }
    }else{
      listaItens[index].quantidade += 1;

    }
  }else{
    Alert.alert(
     'Quantidade Máxima Permitida',
     'Já atingiu a quantidade máxima.',
     [
       {text: 'OK', onPress: () => {

       }},
     ],
     { cancelable: false }
   )
  }
}
  this.setState({ listaItens });
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

onCheckBoxSortidos(){
  if(this.totalItens>0){
    Alert.alert(
     'Zerar quantidades',
     'Você precisa zerar as quantidades antes de escolher a opção de sabores sortidos',
     [
       {text: 'OK', onPress: () => {

       }},
     ],
     { cancelable: false }
   )
 }else{
  this.setState({
    checkBoxSortidos:!this.state.checkBoxSortidos
  });}
}


render() {

  const { listaItens } = this.state;
  this.totalItens=0
  this.totalSabores=0
  this.tipoItens.forEach((item,index)=>{
    this.tipoItens[index].qtdeAtual =0
  })
    listaItens.forEach((item) => {
      this.totalItens += item.quantidade;
      this.tipoItens.forEach((item1,index)=>{
          // this.tipoItens[index].qtdeAtual = 0
        if(item1.qtdeMaxima){
          if(item1.nome==item.tipoItem){
            this.tipoItens[index].qtdeAtual += item.quantidade
          }
        }

      })

      if(item.quantidade>0){
        this.totalSabores++
      }


    })


  console.ignoredYellowBox = [
    'Setting a timer'
  ]

  const content = this.state.loadingList ?

  <View style={styles.containerIndicator}>
    <LazyActivity/>
  </View> :

  <View style={{flex: 1}}>
      {this.sortidos?
        <View style={{height: 70,marginTop: 10,flexDirection: 'row',alignItems: 'center',
         justifyContent: 'space-between'}}>
          <View style={{flexShrink:1,width:wp('38%'),marginLeft:wp('3.8%'),justifyContent: 'center',flex:1}}>
            <Text style={[styles.textAdicionais, {marginHorizontal: 5}]}>
              Sabores sortidos
            </Text>
            <Text style={{marginHorizontal: 7}}>
              Marcando essa opção os sabores serão escolhidos de formas variadas com todos os sabores inclusos.
            </Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: wp('3.8%')}}>
            <Icon
              style={{alignSelf: 'center',justifyContent: 'center'}}
              color={cores.corPrincipal}
              name={this.state.checkBoxSortidos? 'check-circle':'circle'}
              size={24}
              onPress={()=>{this.onCheckBoxSortidos()}}
              ></Icon>
          </View>
        </View>:
        <View></View>}
      <FlatList
        ItemSeparatorComponent={ListItemSeparator}
        data= {this.state.listaItens}
        extraData={this.state.checkBoxChecked}
        renderItem={({ item, index }) => (
          <AntesAddProdutoListItem
            item={item}
            tipoPagina={this.tipoPagina}
            checkBoxChecked ={this.state.checkBoxChecked==item._id ? true : false}
            onCheckBoxPress={() => this.onCheckBoxPress(item._id)}
            onSubtract={() => this.onSubtract(item, index)}
            onAdd={() => this.onAdd(item, index)}
            onSubtractDez={() => this.onSubtractDez(item, index)}
            onAddDez={() => this.onAddDez(item, index)}
          />
        )}
        keyExtractor={item => item._id.toString()}
      />
    {this.tipoPagina=="quantidade"?
      <View style={{borderTopWidth: 1,borderTopColor: cores.corSecundaria}}>
        <Text style={{fontFamily: 'Futura-Book',marginVertical: 15,
          marginLeft: 20,fontSize: wp('4.5%'),alignSelf: 'center',justifyContent: 'center'}}>Faltam adicionar: {this.qtdeItens-this.totalItens}</Text>
      </View>:
        <View></View>
    }
    <LazyYellowButton
      styleButton={{width: wp('100%')}}
      styleText={{fontFamily:'FuturaPT-Bold',color:cores.corPrincipal, fontSize: wp('5%')}}
      onPress={()=>{
        const {state} = this.props.navigation
        let detalhes=""
        //verificar se atingiu o valor qtdeItens

        if(this.tipoPagina=="checkbox"){


          if(this.state.checkBoxChecked==100000){
            Alert.alert(
             'Selecionar Item',
             'Nenhum item foi selecionado.',
             [
               {text: 'OK', onPress: () => {

               }},
             ],
             { cancelable: false }
           )
          }else{
            this.state.listaItens.map((item)=>{
              if(this.state.checkBoxChecked==item._id){

                detalhes = _.upperFirst(item.nome)
              }
            })
            if(this.pagAtual==this.qtdePaginas){

              detalhes = state.params.detalhes+detalhes
              this.props.navigation.push('AddProduto',{
              nomeEstabelecimento: state.params.nomeEstabelecimento,
              nome: state.params.nome,
              preco: state.params.preco,
              detalhes: detalhes,
              imgProduto: "" , tipoProduto: state.params.tipoProduto ,
              tipoEstabelecimento: state.params.tipoEstabelecimento})
            }else{

              this.props.navigation.push('AntesAddProduto',{tipoEstabelecimento: state.params.tipoEstabelecimento,
              title:state.params.paginas[this.pagAtual].titulo, preco: state.params.preco,
              paginas: state.params.paginas,
              nome: state.params.nome,
              detalhes:detalhes+" / ",
              tipoProduto: state.params.tipoProduto,
              pagAtual: this.pagAtual+1,
              nomeEstabelecimento: state.params.nomeEstabelecimento  })
            }
          }
          //se o tipo de pagina for quantidade
        }else{
          //se a opção sortidos for escolhida
        if(this.state.checkBoxSortidos){
          if(this.pagAtual==this.qtdePaginas){
            detalhes = state.params.detalhes+"(Sortidos), ",
            detalhes = detalhes.slice(0,-2)
            this.props.navigation.push('AddProduto',{
            nomeEstabelecimento: state.params.nomeEstabelecimento,
            nome: state.params.nome,
            preco: state.params.preco,
            detalhes: state.params.detalhes+detalhes,
            imgProduto: "" , tipoProduto: state.params.tipoProduto ,
            tipoEstabelecimento: state.params.tipoEstabelecimento})
          }else{
            this.props.navigation.push('AntesAddProduto',{tipoEstabelecimento: state.params.tipoEstabelecimento,
            paginas: state.params.paginas,
            title:state.params.paginas[this.pagAtual].titulo, preco: state.params.preco,
            detalhes:state.params.detalhes+"Sortidos"+" / ",
            nome: state.params.nome,
            tipoProduto: state.params.tipoProduto,
            pagAtual: this.pagAtual+1,
            nomeEstabelecimento: state.params.nomeEstabelecimento  })
          }
        }else{
        if(this.totalItens<this.qtdeItens){
          Alert.alert(
           'Faltando itens',
           'Você ainda não atingiu a quantidade máxima. Atente para quantos ainda faltam adicionar para atingir a quantidade pedida.',
           [
             {text: 'OK', onPress: () => {

             }},
           ],
           { cancelable: false }
         )
        }else{
          this.state.listaItens.map((item)=>{
            if(item.quantidade>0){
              detalhes = detalhes+""+_.upperFirst(item.nome)+" ("+item.quantidade+"), "
            }
          })
          if(this.pagAtual==this.qtdePaginas){
            detalhes = state.params.detalhes+detalhes
            detalhes = detalhes.slice(0,-2)
            this.props.navigation.push('AddProduto',{
            nomeEstabelecimento: state.params.nomeEstabelecimento,
            nome: state.params.nome,
            preco: state.params.preco,
            detalhes: state.params.detalhes+detalhes,
            imgProduto: "" , tipoProduto: state.params.tipoProduto ,
            tipoEstabelecimento: state.params.tipoEstabelecimento})
          }else{
            this.props.navigation.push('AntesAddProduto',{tipoEstabelecimento: state.params.tipoEstabelecimento,
            paginas: state.params.paginas,
            title:state.params.paginas[this.pagAtual].titulo, preco: state.params.preco,
            detalhes:state.params.detalhes+detalhes+" / ",
            nome: state.params.nome,
            tipoProduto: state.params.tipoProduto,
            pagAtual: this.pagAtual+1,
            nomeEstabelecimento: state.params.nomeEstabelecimento  })
          }
        }
        }
      }




      }}
      text={"ADICIONAR"}/>
  </View>

    return (
      <ImageBackground
        source={images.imageBackground}
        style={styles.backgroundImage}>
        {content}
      </ImageBackground>
    );
  }
}
