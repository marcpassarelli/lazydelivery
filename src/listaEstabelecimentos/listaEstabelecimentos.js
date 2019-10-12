
import React, { Component } from 'react';
import { ImageBackground,Modal, Image, View, Text, FlatList,BackHandler,TouchableOpacity } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import ListaEstabelecimentosListItem from './listaEstabelecimentosListItem'
import {semEstabelecimentos,abertoFechado,getListaEstabelecimentos, listaEstabelecimentos, limparEstabelecimentoProd} from '../firebase/database'
import Loader from '../loadingModal/loadingModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LazyActivity from '../loadingModal/lazyActivity'
import LazyBackButton from '../constants/lazyBackButton'
import ListItemSeparator from '../constants/listItemSeparator'
import { Button } from 'react-native-elements';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import ModalFiltro from './modalFiltro'
import _ from 'lodash'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
var todoCounter=0
var tipoEstabelecimentoUp ='';
var bairro=''
var newListaEstabelecimentosOpen=[]
var newListaEstabelecimentosClosed=[]
export class ListaEstabelecimentosScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    headerMode:'float',
    title: _.upperCase(navigation.state.params.tipoEstabelecimento),
    headerTitleStyle: [styles.headerText,{alignSelf:'center'}],
    headerStyle: styles.header,
    headerLeft: (
      <View style={{flex:1}}>
      <LazyBackButton
        goBack={()=>{
        navigation.push('Home',{
          telaAnterior: 'listaEstabelecimentos'
        })
      }}/>
      </View>
    ),
    headerRight: navigation.state.params.tipoEstabelecimento == 'Comida' ?
    (
      <View style={{marginRight: 8}}>
        <TouchableOpacity onPress={navigation.getParam('filtrar')}>
          <Text style={{color: cores.corSecundaria,fontSize: hp('2.5%'),fontFamily:'FuturaPT-Bold' }}>Filtrar</Text>
        </TouchableOpacity>
      </View>
    ) :
    (<View></View>),
  });

constructor(props){
  super(props)
  this.state = {
    tipoEstabelecimento:'',
    listaEstabelecimentosUp:'',
    loading: false,
    loadingList: false,
    estabAbertos:[],
    estabAbertosFiltrados:[],
    estabFechados:[],
    modalVisible: false,
    listaFiltros:[{
      title:'Restaurantes',
      selected:false
    },{
      title:'Lanches',
      selected:false
    },{
      title:'Salgados',
      selected:false
    },{
      title:'Docerias',
      selected:false
    },{
      title:'Pizzas',
      selected:false
    },{
      title:'Sushi',
      selected:false
    },{
      title:'Churrasco',
      selected:false
    },{
      title:'Açaí',
      selected:false
    },{
      title:'Comida Fit',
      selected:false
    }]

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

  limparEstabelecimentoProd()
  const {state} = this.props.navigation;
  this.tipoEstabelecimentoUp = state.params ? state.params.tipoEstabelecimento : ""

  this.bairro = state.params ? state.params.bairro:""

  this.setState({
     loadingList: true
  },function(){

    getListaEstabelecimentos(this.tipoEstabelecimentoUp, this.bairro,
    ()=>{

      if(semEstabelecimentos==true){

        this.setState({
          estabAbertos:null,
          estabAbertosFiltrados:null
        },function(){

          this.setState({
            loadingList:false
          });
        });
      }else{

      newListaEstabelecimentosOpen=[]
      //console.log("bairor"+this.bairro);
      //console.log("listaEstabelecimentos"+JSON.stringify(listaEstabelecimentos));
      abertoFechado.map((aberto,index2)=>{
        listaEstabelecimentos.map((lista,index)=>{
          if(aberto.nome==lista.nome){
            if(aberto.aberto==true&&lista.frete!='n'){
              newListaEstabelecimentosOpen.push({
                logo: lista.logo,
                nome: lista.nome,
                precoDelivery: lista.precoDelivery,
                tempoEntrega: lista.tempoEntrega,
                filtros: lista.filtros,
                frete:lista.frete,
                fechando:aberto.fechando,
                horarioFechamento:aberto.horarioFechamento,
                aberto:aberto.aberto,
                _id:todoCounter++,
                filtrado: true
              })
            }else if(aberto.aberto==false&&lista.frete!='n'){
              newListaEstabelecimentosOpen.push({
                logo: lista.logo,
                nome: lista.nome,
                precoDelivery: lista.precoDelivery,
                tempoEntrega: lista.tempoEntrega,
                frete:lista.frete,
                filtros: lista.filtros,
                horarioFechamento:aberto.horarioFechamento,
                fechando:aberto.fechando,
                aberto:aberto.aberto,
                _id:todoCounter++,
                filtrado: true
              })
            }
          }
        })
      })
      newListaEstabelecimentosOpen = _.orderBy(newListaEstabelecimentosOpen, ['aberto','nome'], ['desc','asc'])
      this.setState({
        estabAbertos:newListaEstabelecimentosOpen,
        estabAbertosFiltrados:newListaEstabelecimentosOpen
      },function(){

        this.setState({
          loadingList: false
        },function(){
          console.log("estabAbertosFiltrados"+JSON.stringify(this.state.estabAbertosFiltrados));
        });
      });
    }
    })

  })
}
componentDidMount(){
  this.props.navigation.setParams({ filtrar: this._filtrar })
}

_filtrar=()=>{
  this.setState({
    modalVisible: true
  });
}

functionListaEstabelecimentos(){
  if(this.state.estabAbertosFiltrados){
    if(Object.keys(this.state.estabAbertosFiltrados).length>0) {
      console.log("dentro if functionListaEstabelecimentos");
      return(
        <FlatList
          ItemSeparatorComponent={ListItemSeparator}
          data= {this.state.estabAbertosFiltrados}
          extraData={this.state}
          renderItem= {
            ({item}) =>
            <ListaEstabelecimentosListItem
              filtrado={item.filtrado}
              fechando={item.fechando}
              horarioFechamento={item.horarioFechamento}
              aberto={item.aberto}
              estabelecimento = {item.nome}
              imglogoEstabelecimento = {item.logo}
              valorDelivery = {item.frete}
              tempoEntrega = {item.tempoEntrega}
              navigation={this.props.navigation}
              tipoEstabelecimento={this.tipoEstabelecimentoUp}>
            </ListaEstabelecimentosListItem>}
          keyExtractor={item => item._id.toString()}
          />)
    }else{
      return(
      <Text style={[styles.textAdicionais,{color:cores.corPrincipal,textAlign: 'center',marginTop: 10,alignSelf: 'center'}]}>Ainda não há estabelecimentos cadastrados nesta categoria para o bairro escolhido.</Text>)
    }
  }else{
    return(
    <Text style={[styles.textAdicionais,{color:cores.corPrincipal,textAlign: 'center',marginTop: 10,alignSelf: 'center'}]}>Ainda não há estabelecimentos cadastrados nesta categoria para o bairro escolhido.</Text>)
  }

}

showModal(){
  this.setState({
    modalVisible:!this.state.modalVisible
  });
}

// onBackButtonPressAndroid = () =>{
//   const {navigate} = this.props.navigation
//   const {state} = this.props.navigation
//   navigate('Home')
//   return true
// }
onPressBtn=(item,index)=>{
  console.log("button pressed"+item.title);
  const listaFiltros = [...this.state.listaFiltros]
  listaFiltros[index].selected= !listaFiltros[index].selected
  this.setState({
    listaFiltros:listaFiltros
  },function(){
    console.log("listaFiltros"+JSON.stringify(listaFiltros));
  });
}

aplicarFiltro(){
  this.setState({
    loadingList:true
  });
  const estabAbertos = [...this.state.estabAbertos]
  var estabAbertosFiltrados = []
  this.state.listaFiltros.map((i1,ind1)=>{
    if(i1.selected==true){
      estabAbertos.map((i2,ind2)=>{
        // console.log("i2"+JSON.stringify(i2));
        i2.filtros.map((i3,ind3)=>{
          console.log("i3.nome"+i3.nome);
          console.log("i1.title"+i1.title);
          if(i3.nome==i1.title){
            console.log("i2[ind2]"+i2);
            estabAbertosFiltrados.push(i2)
          }
        })
      })
      // pegar os itens que NÃO está selecionado
      // verificar em quais estabelecimentos ele aparece
      // mudar filtrado para
    }
  })

  // estabAbertos.map((item,index)=>{
  //
  //
  // })
  // logo: lista.logo,
  // nome: lista.nome,
  // precoDelivery: lista.precoDelivery,
  // tempoEntrega: lista.tempoEntrega,
  // frete:lista.frete,
  // filtros: lista.filtros,
  // horarioFechamento:aberto.horarioFechamento,
  // fechando:aberto.fechando,
  // aberto:aberto.aberto,
  // _id:todoCounter++
  estabAbertosFiltrados = _.uniqBy(estabAbertosFiltrados,'nome')
  this.setState({
    estabAbertosFiltrados:estabAbertosFiltrados,
    modalVisible: false
  },function(){
    console.log("estabAbertosFiltrados"+JSON.stringify(estabAbertosFiltrados));
    this.setState({
      loadingList:false
    });
  });
}

limparFiltro(){
  this.setState({
    loadingList:true
  },function(){
    this.setState({
      estabAbertosFiltrados: this.state.estabAbertos,
      modalVisible: false
    },function(){
      this.setState({
        loadingList:false
      });
    });
  });
}

render() {
  console.ignoredYellowBox = [
    'Setting a timer'
  ]

  const content = this.state.loadingList ?

  <View style={styles.containerIndicator}>
    <LazyActivity/>
  </View> :


  <View style={{flex:1}}>
  <View style={{marginTop:10}}></View>
  {this.functionListaEstabelecimentos()}

  </View>


  return (

    <ImageBackground
      source={images.imageBackground}
      style={styles.backgroundImage}>
      <Loader
          loading = {this.state.loading}/>
        <ModalFiltro
          listaFiltros={
            this.state.listaFiltros.map((item,index)=>{
              return(
                <View key={index} >
                  <TouchableOpacity
                    style={item.selected ?
                      {backgroundColor: cores.corPrincipal,marginBottom: 6,
                      height: 35,marginHorizontal:5,justifyContent: 'center'} :
                      {backgroundColor:"#DDDDDD",marginBottom: 10,justifyContent: 'center',marginHorizontal: 5, height: 35}}
                    onPress={()=>{this.onPressBtn(item,index)}}>
                    <Text style={{color: cores.textDetalhes,fontFamily: 'Futura-Medium',
                      fontSize: wp('5%'),alignSelf: 'center',marginHorizontal: 10}}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
          modalVisible={this.state.modalVisible}
          showModal={()=>{this.showModal()}}
          onPressBtn={()=>{this.onPressBtn()}}
          aplicarFiltro={()=>{this.aplicarFiltro()}}
          limparFiltro={()=>{this.limparFiltro()}}/>
      {content}
    </ImageBackground>

);
}
}


// {
//   Object.keys(this.state.estabFechados).length>0?
// <View>
//   <Text style={{fontFamily: 'Futura-Medium',fontSize: wp('4%'),
//     marginLeft: wp('7%'),color: 'red',marginBottom: hp('1%')}}>Fechado</Text>
//     <FlatList
//       ItemSeparatorComponent={ListItemSeparator}
//       data= {newListaEstabelecimentosClosed}
//       extraData={this.state}
//       renderItem= {
//         ({item}) =>
//         <ListaEstabelecimentosListItem
//           aberto={false}
//           estabelecimento = {item.nome}
//           imglogoEstabelecimento = {item.logo}
//           valorDelivery = {item.frete}
//           tempoEntrega = {item.tempoEntrega}
//           navigation={this.props.navigation}
//           tipoEstabelecimento={this.tipoEstabelecimentoUp}>
//         </ListaEstabelecimentosListItem>}
//       keyExtractor={item => item._id.toString()}
//       />
//     </View>
//     :
//   <View></View>
//
//   }
