import React, { Component } from 'react';
import { ImageBackground, TextInput, Picker, PickerIOS, Platform, ScrollView,
   Dimensions, Image, Alert, View, Text, Button, FlatList, Icon,BackHandler } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import LazyActivity from '../loadingModal/lazyActivity'
import {carrinho, atualizarCarrinho} from '../addproduto/addproduto'
import { getUserProfile, getUserEndAtual, getEstabelecimentoInfo,
  loadMessages, sendMessage,deleteMessages, salvarPedido} from '../firebase/database'
import ResumoCarrinhoListItem from './resumoCarrinhoListItem'
import {frete} from '../home/home'
import ResumoInformacoes from './resumoInformacoes'
import Loader from '../loadingModal/loadingModal';
import LazyBackButton from '../constants/lazyBackButton'
import LazyYellowButton from '../constants/lazyYellowButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {auth} from '../firebase/firebase'
import { CheckBox } from 'react-native-elements'

import _ from 'lodash'

let totalPrice =0
let teste=[];
let estabelecimento=""
let pedidoKey=''
const produtosCarrinho = []

var myVar;

export class ResumoPgtoScreen extends Component{

  static navigationOptions = ({navigation}) => ({
    title: "RESUMO PEDIDO",
    headerTitleStyle: [styles.headerText,{alignSelf:'center'}],
    headerStyle: styles.header,
    headerLeft: (
      <LazyBackButton
        goBack={  ()=>{
            navigation.navigate('Carrinho')
          }}/>
    ),
    headerRight:(<View style={styles.headerRight}></View>)
  });

constructor(props){
  super(props);
  this.state = {
    produtosCarrinho,
    loading: true,
    nomeEstabelecimento:"",
    logo: "",
    nome: "",
    precoDelivery: "",
    tempoEntrega: "",
    deb: "",
    cre: "",
    din: "",
    selectedIndex:0,
    checked:true,
    checked2:false,
    checked3:false,
    frete:frete,
    troco:'',
    esperandoConfirmacao:false,
    key:"",
    retirar:''


  }
  this.updateIndex = this.updateIndex.bind(this)
}

updatePgtoEscolhido = (value) => {
   this.setState({ pgtoEscolhido: value })
}
updateIndex (selectedIndex) {
  this.setState({selectedIndex})
}

updateTroco = (text) => {
  this.setState({troco: text})
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick=()=> {
  this.props.navigation.goBack();
  return true;
}

async componentWillMount(){
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  let userId = await auth.currentUser.uid

  this.estabelecimento= this.props.navigation.state.params.nomeEstabelecimento

  this.setState({
          loading: true,
          retirar: this.props.navigation.state.params.retirarLoja,
          produtosCarrinho: carrinho,
          nomeEstabelecimento: this.estabelecimento
        },function(){
          if (this.state.retirar) {
            this.setState({
              frete:0
            });
          }
        });
  let user = await auth.currentUser;
  //Pegar formas de pagamento
  getEstabelecimentoInfo(this.estabelecimento, (logoUp, nomeUp, precoDeliveryUp,
    tempoEntregaUp, segUp, terUp, quaUp, quiUp, sexUp, sabUp, domUp, creUp, debUp, dinUp)=>{
    this.setState({
        logo: logoUp,
        nomeEstab: nomeUp,
        precoDelivery: precoDeliveryUp,
        tempoEntrega: tempoEntregaUp,
        seg: segUp,
        ter: terUp,
        qua: quaUp,
        qui: quiUp,
        sex: sexUp,
        sab: sabUp,
        dom: domUp,
        cre: creUp,
        deb: debUp,
        din: dinUp
    },function(){
      this.setState({
        loading: false
      });
    })
  })
  //Pegar informações usuário
  getUserProfile(user.uid, (nomeP,telefoneP,profilePicURLP)=>{

    this.setState({
      nome: nomeP,
      telefone: telefoneP,
    },function(){

    });
  })
  //Pegar endereço cadastrado
  getUserEndAtual((enderecoP,bairroP,referenciaP)=>{

      this.setState({
        endereco:enderecoP,
        bairro:bairroP,
        referencia:referenciaP
      },function(){

        this._callback()
      });
    })



}

_callback(){

}

checkTimeOut=(key)=>{
  console.log("dentro checktimeout");
  this.setState({
    esperandoConfirmacao: false
  },function(){
    deleteMessages(this.state.nomeEstabelecimento,key)
    Alert.alert(
      'Erro no Pedido',
      'Ocorreu algum erro no pedido e não obtivemos resposta do restaurante. Verifique se o horário de funcionamento do restaurante ou então tente novamente.',
       [
         {text: 'OK', onPress: () => {
           const { navigate } = this.props.navigation;
           navigate('Carrinho')
         }},
       ],
       { cancelable: false }
    )
  });
}

timeoutPedido=(key)=>{
  console.log("inside timeout");
  myVar = setTimeout(()=>{
    this.checkTimeOut(key)
  }, 60000);
}

fazerPedido(){

  Alert.alert(
    'Confirmar Pedido',
    'Deseja confirmar o pedido? Após a confirmação, o pedido será enviado para o estabelecimento para preparo.',
    [
      {text: 'Sim', onPress: () => {

        this.setState({
          esperandoConfirmacao: true
        });
        let estabelecimentoLoad = this.props.navigation.state.params.nomeEstabelecimento
        let formaPgto, formaPgtoDetalhe;
        if(this.state.checked){
          formaPgto = "Crédito"
          if(this.state.pgtoEscolhido){
            formaPgtoDetalhe = this.state.pgtoEscolhido
          }else{
            formaPgtoDetalhe = this.state.cre[0].bandeira
          }
        }else if(this.state.checked2){
          formaPgto = "Débito"
          if(this.state.pgtoEscolhido){
            formaPgtoDetalhe = this.state.pgtoEscolhido
          }else{
            formaPgtoDetalhe = this.state.deb[0].bandeira
          }
        }else{
          formaPgto = "Dinheiro"
          formaPgtoDetalhe = this.state.troco
        }


        // console.log("timerId"+timerId);
        //mandar informação do pedido para o banco de dados do pedido

        sendMessage(this.state.retirar, this.state.produtosCarrinho, formaPgto, formaPgtoDetalhe,
           this.state.nome, this.state.telefone, this.state.endereco, this.state.bairro,
           this.state.referencia, this.state.nomeEstabelecimento, "Aguardando Confirmação",(key)=>{
             this.timeoutPedido(key.key)
             // console.log("pedidoKey"+pedidoKey);

             //aguardar confirmação do estabelecimento
             loadMessages(this.state.nomeEstabelecimento, key.key, (message)=>{
               clearTimeout(myVar)
               myVar=0
               if(message.status=="Confirmado Recebimento"){
                 this.setState({
                   esperandoConfirmacao: false
                 },function(){
                   //caso pedido seja confirmado
                   Alert.alert(
                    'Pedido Recebido.',
                    'Seu pedido foi recebido pelo estabelecimento e está sendo preparado para o envio até você. Em caso de dúvidas entre em contato com o estabelecimento',
                    [
                      {text: 'OK', onPress: () => {

                        salvarPedido(this.state.retirar, this.state.produtosCarrinho, this.totalPrice, this.state.frete, formaPgto, formaPgtoDetalhe,
                          this.state.endereco, this.state.bairro,
                          this.state.nomeEstabelecimento, key.key)
                        atualizarCarrinho([])
                        const { navigate } = this.props.navigation;
                        navigate('Home')
                      }},
                    ],
                    { cancelable: false }
                  )
                 });
               }else if(message.status=="Estabelecimento Fechado"){
                 this.setState({
                   esperandoConfirmacao: false
                 },function(){
                   Alert.alert(
                     'Estabelecimento Fechado.',
                     'Sinto muito mas o estabelecimento fechou e não está aceitando mais pedidos.',
                     [
                       {text: 'OK', onPress: () => {
                         const { navigate } = this.props.navigation;
                         navigate('Carrinho')
                       }},
                     ],
                     { cancelable: false }
                   )
                 });
               }
             })
           })
      }},
      {text: 'Não', onPress: ()=>{
        console.log("cancelado");
      }},
    ],
    {cancelable: false}
  )
}

functionPicker(tipoPgto){
  if(Platform.OS==='ios'){
    return(
    <PickerIOS
      itemStyle={{color: cores.corPrincipal,height:80, fontSize: wp('5%'),right: 10}}
      style={{height: 80}}
      selectedValue={this.state.pgtoEscolhido}
      onValueChange={this.updatePgtoEscolhido}>
      {tipoPgto.map((item, index)=>{
        return (<Picker.Item label={item.bandeira} value={item.bandeira} key={index} />)
      })}
    </PickerIOS>
  )
  }else{
    return(
      <View style={{marginRight: wp('5%')}}>
      <Picker
        style={{flex:1, height: 40}}
        selectedValue={this.state.pgtoEscolhido}
        onValueChange={this.updatePgtoEscolhido}>
        {tipoPgto.map((item, index)=>{
          return (<Picker.Item label={item.bandeira}
            value={item.bandeira} key={index}color={cores.textDetalhes} />)
        })}
      </Picker>
      </View>
    )
}
}

funcaoCredito(){
  return(
    <View style={{marginLeft: 25}}>
      <Text style={{fontSize: wp('3.75%'),fontFamily: 'Futura Medium'}}>Selecione a bandeira do seu cartão de crédito:</Text>
      <View>{this.functionPicker(this.state.cre)}</View>
    </View>
  )
}

funcaoDebito(){
  return(
    <View style={{marginLeft: 25}}>
      <Text style={{fontSize: wp('3.75%'),fontFamily: 'Futura Medium'}}>Selecione a bandeira do seu cartão de débito:</Text>
      <View>{this.functionPicker(this.state.deb)}</View>
    </View>
  )
}

funcaoTroco(){
  return(
    <View style={{marginLeft: 25,flexDirection: 'row',alignItems: 'center'}}>
      <Text style={{fontSize: wp('3.75%'),fontFamily: 'Futura Medium'}}>Troco para:</Text>
      <TextInput
        style={[styles.textInputs,{width: wp('25%'), fontSize: wp('3.75%')}]}
        onChangeText = {this.updateTroco}
        underlineColorAndroid= "#d1d1d1"
        labelStyle={{ color: cores.corPrincipal }}
        borderColor={cores.corPrincipal}
        returnKeyType="next"
        keyboardType='numeric'
        maxLength={6}
       />
    </View>
  )
}

valorVirgula(valor){
  var str = parseFloat(valor)
  str = str.toFixed(2)
  var res = str.toString().replace(".",",")
  return(
      <Text>{res}</Text>
  )
}

renderHeader=()=>{
  return (
    <View style={{marginBottom: hp('1.11%'),shadowOpacity: 0.5,
        borderWidth: 0.8,backgroundColor: cores.corPrincipal,
        height:35, flexDirection: 'row',justifyContent: 'space-between',
        alignItems: 'center'}}>
        <View style={
            {height:35,
            justifyContent: 'center',alignItems:'center',
            marginLeft:10,
            borderRightColor: cores.corSecundaria,
            borderRightWidth: 0.5,
            width:wp('18%')}}>
            <Text style={{color:cores.corSecundaria,
                marginLeft: 5,fontFamily: 'Futura Medium'}}>QTD.</Text>
        </View>

        <View style={{width:wp('54%'),height:35, justifyContent: 'center',
          borderRightColor: cores.corSecundaria,borderRightWidth: 0.5}}>
          <Text style={{
              marginLeft: 5,color:cores.corSecundaria,fontFamily: 'Futura Medium'}}
              >ITEM</Text>
        </View>

        <View style={{width: wp('24%'),height: 35,
          justifyContent: 'center',alignItems:'center' ,marginRight:10}}>
          <Text style={{color:cores.corSecundaria,
              fontFamily: 'Futura Medium',alignSelf: 'center'}}>PREÇO</Text>
        </View>


    </View>)
}

render() {
  var {width, height} = Dimensions.get('window');
  const buttons = [{element: this.credito},{element: this.debito},{element: this.dinheiro}]
  const { selectedIndex } = this.state

  const { produtosCarrinho } = this.state
  this.totalPrice=0
    produtosCarrinho.forEach((item) => {
      this.totalPrice += item.quantidade * item.preco;
    })

  console.ignoredYellowBox = [
    'Setting a timer'
  ]

  const content = this.state.loading ?

  <View style={styles.containerIndicator}>
    <LazyActivity/>
  </View> :

  <View style={{flex:1}}>
    <Loader
            loading={this.state.esperandoConfirmacao}
            message="Aguarde enquanto o estabelecimento confirma o recebimento do pedido..." />
          <View style={{maxHeight: 150}}>

      {/* Resumo Carrinho */}
    <FlatList
      ListHeaderComponent={this.renderHeader}
      ItemSeparatorComponent={this.renderSeparator}
      data= {this.state.produtosCarrinho}
      extraData={this.state}
      stickyHeaderIndices={[0]}
      renderItem= {
        ({item}) =>
        <ResumoCarrinhoListItem
          item ={item}
          preco={() => {
            var str = (item.preco*item.quantidade).toFixed(2)
            var res = str.toString().replace(".",",")
            let fontSize=0
            if(item.adicional==true){
              fontSize=13
            }else{
              fontSize=15
            }
            return(
                <Text style={[styles.textCarrinho,{
                    color: cores.textDetalhes,
                    fontFamily: "Futura Medium Italic BT",
                    alignSelf: 'center', fontSize: fontSize}]}>
                  R$ {res}
                </Text>
            )
          }}>
        </ResumoCarrinhoListItem>}
      keyExtractor={item => item._id.toString()}
      />
    </View>
    {this.state.retirar ?
      <View></View>
    :
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: hp('0.55%')}}>
          <Text style={[styles.textResumoPgto]}>Valor Pedido:</Text>
          <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.valorVirgula(this.totalPrice)}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: hp('0.55%')}}>
          <Text style={[styles.textResumoPgto]}>Valor Frete:</Text>
          <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.valorVirgula(this.state.frete)}</Text>
        </View>
      </View>
    }
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: hp('0.55%')}}>
      <Text style={[styles.textResumoPgto]}>Valor Total Pedido:</Text>
      <Text style={[styles.textResumoPgto,{color:cores.textDetalhes ,alignItems:'flex-end'}]}>R$ {this.valorVirgula(this.totalPrice+this.state.frete)}</Text>
    </View>

      {/* Resumo Formas Pgto */}
    <ScrollView>
    <View style={{height:2, backgroundColor: cores.corSecundaria}}></View>

    <Text style={[styles.textAdicionais,{fontFamily:'Futura Medium Italic BT' ,fontSize: wp('4.5%'), marginVertical: 5,marginLeft: 5}]}>Selecione a forma de pagamento:</Text>
    <View style={{}}>
      <CheckBox
        textStyle={{marginLeft: 10,fontSize: wp('5%'),fontFamily: 'Futura Medium',fontWeight: 'normal'}}
        containerStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}}
        title='Cartão de Crédito'
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor={cores.textDetalhes}
        uncheckedColor={cores.textDetalhes}
        checked={this.state.checked}
        onPress={() => {
          this.setState({checked: true})
          this.setState({checked2: false})
          this.setState({checked3: false})
        }}
      />
      <View>
        {this.state.checked && this.funcaoCredito()}
      </View>
      <CheckBox
        textStyle={{marginLeft: 10,fontSize: wp('5%'),fontFamily: 'Futura Medium',fontWeight: 'normal'}}
        containerStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}}
        title='Cartão de Débito'
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor={cores.textDetalhes}
        uncheckedColor={cores.textDetalhes}
        checked={this.state.checked2}
        onPress={() => {
          this.setState({checked: false})
          this.setState({checked2: true})
          this.setState({checked3: false})
        }}
      />
      <View>
        {this.state.checked2 && this.funcaoDebito()}
      </View>
      <CheckBox
        textStyle={{marginLeft: 10,fontSize: wp('5%'),fontFamily: 'Futura Medium',fontWeight: 'normal'}}
        containerStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}}
        title='Dinheiro'
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor={cores.textDetalhes}
        uncheckedColor={cores.textDetalhes}
        checked={this.state.checked3}
        onPress={() => {
          this.setState({checked: false})
          this.setState({checked2: false})
          this.setState({checked3: true})
        }}
      />
      <View>
        {this.state.checked3 && this.funcaoTroco()}
      </View>
    </View>

    {/* Resumo Informações */}
    <View style={{height:2, backgroundColor: cores.corSecundaria}}></View>

      <ResumoInformacoes
        retirar={this.state.retirar}
        nome={this.state.nome}
        telefone={this.state.telefone}
        endereco={this.state.endereco}
        bairro={this.state.bairro}
        referencia={this.state.referencia}/>

      </ScrollView>
      <LazyYellowButton
        styleButton={{width: wp('100%')}}
        styleText={{fontFamily:'Futura PT Bold',color:cores.corPrincipal, fontSize: wp('5%')}}
        onPress={()=>{this.fazerPedido()}}
        text={"FINALIZAR PEDIDO"}
        />
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
