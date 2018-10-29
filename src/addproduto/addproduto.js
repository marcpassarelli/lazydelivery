
import React, { Component } from 'react';
import { ImageBackground, Platform, BackHandler, Image, View, Text,TextInput, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import {getListaAdicionais, listaAdicionais} from '../firebase/database'
import {adicionaisEscolhidos} from './adicionais'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from '../loadingModal/loadingModal';
import StatusBar from '../constants/statusBar'
import { AndroidBackHandler } from 'react-navigation-backhandler';
import LazyActivity from '../loadingModal/lazyActivity'
import LazyBackButton from '../constants/lazyBackButton'
import LazyYellowButton from '../constants/lazyYellowButton'
import { NavigationActions } from 'react-navigation';
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let listener = null
export var carrinho =[]
var todoCounter = 1;
var totalPrecoAd=0;
var tag=0

export function atualizarCarrinho(carrinhoAtualizado){
  carrinho = carrinhoAtualizado
}

export class AddProdutoScreen extends Component{

    static navigationOptions = ({navigation}) => ({
      title: _.upperCase(navigation.state.params.nomeEstabelecimento),
      headerTitleStyle: [styles.headerText,{alignSelf:'center'}],
      headerStyle: styles.header,
      headerLeft: (
        <LazyBackButton
          goBack={ ()=>{
              navigation.navigate('Estabelecimento',
              {nomeEstabelecimento:navigation.state.params.nomeEstabelecimento,
              tipoEstabelecimento: navigation.state.params.tipoEstabelecimento})
            }}/>
      ),
      headerRight:(<View style={styles.headerRight}></View>)
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
    console.log("WILLMOUNT");
    this.setState({
      loading: true
    });
    const {state} = this.props.navigation
    const {navigation} = this.props

    var nome = state.params ? state.params.nome : ""
    var preco = state.params.tipoProduto=="Pizzas" ? state.params.precoPizza : state.params.preco
    var detalhes = state.params ? state.params.detalhes : ""
    var imgProduto = state.params ? state.params.imgProduto : ""
    var tipoProduto = state.params ? state.params.tipoProduto : ""

    var estabelecimento = state.params ? state.params.nomeEstabelecimento : ""

    var telaAdicionais = state.params ? state.params.telaAdicionais : ""
    var tipoEstabelecimento = state.params ? state.params.tipoEstabelecimento : ""
    this.totalPrecoAd = navigation.getParam('totalPreco','')
    console.log("totalPrecoAd"+totalPrecoAd);

    //Se tiver vindo da lista de produtos zerará os adicionais
    if(!telaAdicionais){
      this.setState({
        listaAdicionais: []
      });
    }

    this.setState({
      nome: nome,
      preco: preco,
      detalhes: detalhes,
      imgProduto: imgProduto,
      tipoProduto: tipoProduto,
      total: preco,
      estabelecimento: estabelecimento,
      tipoEstabelecimento: tipoEstabelecimento
    },function(){

    });

    getListaAdicionais(estabelecimento, tipoProduto,()=>{
      this.setState({
        loading: false
      },function(){

      });
    })

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
    navigate({routeName:'Estabelecimento',
      params:{toast:this.state.nome, nomeEstabelecimento: estabelecimento,
      tipoEstabelecimento: state.params.tipoEstabelecimento },
      key:Math.random () * 10000})
  this.setState({
    loadingAfter:false
  })
    tag++
  }

  checkAdicionais(){
    var total = parseFloat(this.state.total) + parseFloat(this.totalPrecoAd)


    if(this.tipoProduto="Pizzas"&&this.totalPrecoAd>0){
      return(
      <View style={{flex:1}}>
        <View style={{flexDirection: 'row',justifyContent: 'center',alignContent: 'center'}}>
          <Text style={[styles.textAddProduto,
              {marginVertical: hp('1.5%')}]}>
              Valor Adicionais: </Text>
          <Text style={[styles.textAddProduto,
              {marginVertical: hp('1.5%'),color:cores.textDetalhes}]}>
              R$ {this.valorVirgula(this.totalPrecoAd)}</Text>
        </View>
        <View style={{flexDirection: 'row',justifyContent: 'center',alignContent: 'center'}}>
          <Text style={[styles.textAddProduto,
              {marginBottom:hp('1.5%')}]}>
              Total com Adicionais: </Text>
          <Text style={[styles.textAddProduto,
              {marginBottom:hp('1.5%'),color:cores.textDetalhes}]}>
              R$ {this.valorVirgula(total)}</Text>
        </View>
      </View>
      )
    }else if(this.totalPrecoAd>0) {
      return(
      <View style={{flex:1}}>
        <Text style={[styles.textAddProduto,{fontSize: 12}]}>Valor Adicionais: R${this.totalPrecoAd}</Text>
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
        <Text style={[styles.textAddProduto,{color:cores.textDetalhes}]}>{res}</Text>
    )
  }

 onBackButtonPressAndroid = () =>{
   const {navigate} = this.props.navigation
   const {state} = this.props.navigation
   navigate('Estabelecimento',
   {nomeEstabelecimento:state.params.nomeEstabelecimento,
   tipoEstabelecimento: state.params.tipoEstabelecimento})
   return true
 }

 functionLoadImage(){
   var {width, height} = Dimensions.get('window');
   if(this.state.imgProduto){
     return(
     <Image
       source={{uri:this.state.imgProduto}}
       loadingIndicatorSource={images.iconSplash}
       defaultSource={{uri:images.iconSplash,width:35,height:35}}
       onLoadEnd={()=>{this.setState({
         imageLoaded: false
       });}}
       style={[styles.imgProduto,{width: width*0.98, height: height*0.3}]}>
     </Image>)
     }
     else{
       return(
       <View style={{marginVertical: 20, justifyContent: 'center',alignItems: 'center',alignSelf: 'center'}}>
         <Text>Nenhuma imagem disponível para este produto</Text>
       </View>
       )
   }

 }

  render() {
    const {state} = this.props.navigation
    console.ignoredYellowBox = [
      'Setting a timer'
    ];



    const content = this.state.loading ?

    <View style={styles.containerIndicator}>
      <LazyActivity/>
    </View> :

    <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
    <View style={{flex:1}}>
      <StatusBar/>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={[styles.textAddProduto,{marginTop:hp('13%') ,marginHorizontal: wp('14.5%'),textAlign:'center', fontSize: 24}]}>
            {this.state.nome}
        </Text>

        <Text style={[styles.textAddProduto,{textAlign: 'center',fontSize: 14 ,marginHorizontal: wp('14%'),color:'rgb(240,242,242)'}]}>
          {this.state.detalhes}
        </Text>

        <View style={{height:4,backgroundColor: cores.textDetalhes,marginHorizontal: wp('14%'),marginVertical: hp('4.6%')}}></View>

        <View style={{flexDirection: 'row',justifyContent: 'center',alignContent: 'center',marginBottom: hp('1.5%')}}>
        <Text style={[styles.textAddProduto]}>Preço Unitário: </Text>
        <Text style={[styles.textAddProduto,{color:cores.textDetalhes}]}>R$ {this.valorVirgula(this.state.preco)}</Text>
        </View>

        <Text style={[styles.textAddProduto,{marginBottom: 5}]}>Quantidade:</Text>

        <View style={{flexDirection: 'row', alignSelf: 'center',marginVertical: hp('1.5%')}}>

          <TouchableOpacity style={{}} onPress={()=>{this.menosQtde()}}>
            <Icon
              name={'minus-circle'}
              size={23}
              color={cores.textDetalhes}/>
          </TouchableOpacity>

          <Text style={[styles.textAddProduto, {marginHorizontal: 10, fontSize: 16}]}>{this.state.qtde}</Text>

          <TouchableOpacity style={{}} onPress={()=>{this.maisQtde()}}>
            <Icon
              name={'plus-circle'}
              size={23}
              color={cores.textDetalhes}/>
          </TouchableOpacity>

        </View>

        <Text style={styles.textAddProduto}>
          Total: R$ {this.valorVirgula(this.state.total)}
        </Text>
        {listaAdicionais.length>0 ?
        <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate({routeName:'Adicionais',
            params:{nome:this.state.nome,
                  preco:this.state.preco,
                  detalhes:this.state.detalhes,
                  imgProduto:this.state.imgProduto,
                  tipoProduto:this.state.tipoProduto,
                  nomeEstabelecimento: this.state.estabelecimento,
                  tipoEstabelecimento: this.state.tipoEstabelecimento },
            key:Math.random () * 10000})

          }}
          style={{marginVertical: hp('1.5%')}}>
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
        <View style={{marginHorizontal:wp('14.5%'),flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'center',alignContent: 'center'}}>{
            this.state.tipoProduto == "Pizzas" ?
              this.state.listaAdicionais.map((item,i)=>{
                return <Text key={i} style={[styles.textAddProduto,{fontSize: 12,textAlign: 'center'}]}>{item.nome}</Text>
              })
            :
            this.state.listaAdicionais.map((item, i, arr)=>{
                if(arr.length === i + 1 ){
                  return (<View key={i} style={{flexDirection: 'row'}}>
                            <Text style={[styles.textAddProduto,{fontSize: 12,textAlign: 'center'}]} >{item.quantidade}x {item.nome} </Text>
                            <Text style={[styles.textAddProduto,{fontSize: 12,textAlign: 'center',color:cores.textDetalhes}]}>(R$ {item.preco*item.quantidade})</Text>
                          </View>)
                }else{
                  return (
                    <View key={i} style={{flexDirection: 'row'}}>
                      <Text style={[styles.textAddProduto,
                          {fontSize: 12,textAlign: 'center'}]} >{item.quantidade}x {item.nome}
                      </Text>
                      <Text  style={[styles.textAddProduto,
                          {fontSize: 12,textAlign: 'center',color:cores.textDetalhes}]}>
                          (R$ {item.preco*item.quantidade}), </Text>
                    </View>)
                }
              })
              }
        </View>
        <View>
          {this.checkAdicionais()}
        </View>


      </ScrollView>
    </View>
    </AndroidBackHandler>

    return (
      <ImageBackground
        source={{uri:this.state.imgProduto}}
        style={styles.backgroundImageAddProduto}>
        <Loader
          loading={this.state.loadingAfter}
          message="Aguarde enquanto a preguiça adiciona o item ao carrinho."/>
        <KeyboardAwareScrollView>
          {content}
        </KeyboardAwareScrollView>
        <View>
          <Text style={[styles.textAddProduto,{
              marginBottom: 0,
              marginLeft:wp('4.45$'),
              alignSelf: 'flex-start',color:cores.textDetalhes}]}>Observações:</Text>
          <TextInput
            style={{backgroundColor: 'rgba(240,240,240,0.5)',
              marginLeft:wp('4.38%'),
              marginRight: 8,
              marginVertical: 8,
              borderRadius: 10,
              color:'#FFFFFF',
              fontFamily: 'Futura Medium',
              height:hp('5%')}}
            onChangeText={(text) => this.setState({obs: text})}
            value={this.state.obs}
            placeholder='Indique o ponto da carne ou para tirar algum ingrediente.'
            placeholderTextColor='#FFFFFF'
            >
          </TextInput>
          <LazyYellowButton
            styleButton={{width: wp('100%')}}
            styleText={{fontFamily:'Futura PT Bold',color:cores.corPrincipal, fontSize: 20}}
            onPress={()=>{this.adicionarAoCarrinho()}}
            text={"ADICIONAR AO CARRINHO"}
            />
        </View>
      </ImageBackground>
    );
  }
}
