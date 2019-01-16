import React, { Component } from 'react';
import { ImageBackground, TextInput, Picker, Platform, ScrollView,ActionSheetIOS,TouchableOpacity,
   Dimensions, Image, Alert, View, Text, Button, FlatList, Icon,BackHandler } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import LazyActivity from '../loadingModal/lazyActivity'
import {carrinho, atualizarCarrinho} from '../addproduto/addproduto'
import { getUserProfile, getUserEndAtual, getEstabelecimentoInfo,
  loadMessages, loadMessagesSemItem, sendMessage,deleteMessages, salvarPedido} from '../firebase/database'
import ResumoCarrinhoListItem from './resumoCarrinhoListItem'
import {frete} from '../home/home'
import ResumoInformacoes from './resumoInformacoes'
import Loader from '../loadingModal/loadingModal';
import LazyBackButton from '../constants/lazyBackButton'
import LazyYellowButton from '../constants/lazyYellowButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {auth} from '../firebase/firebase'
import { CheckBox } from 'react-native-elements'
import { semCadastro } from '../login/loginregister'

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

    if(semCadastro){

    }else{
      //Pegar informações usuário
        let user = await auth.currentUser;
      getUserProfile(user.uid, (nomeP,telefoneP,profilePicURLP)=>{

        this.setState({
          nome: nomeP,
          telefone: telefoneP,
        },function(){

        });
      })
    }



}

_callback(){

}

checkTimeOut=(key)=>{
    deleteMessages(this.state.nomeEstabelecimento,key)
    Alert.alert(
      'Erro no Pedido',
      'Ocorreu algum erro no pedido e não obtivemos resposta do restaurante. Verifique se o horário de funcionamento do restaurante ou então tente novamente.',
       [
         {text: 'OK', onPress: () => {
           this.setState({
             esperandoConfirmacao:false
           });
           const { navigate } = this.props.navigation;
           navigate('Carrinho')
         }},
       ],
       { cancelable: false }
    )

}

timeoutPedido=(key)=>{
  var myVar1 = setTimeout(()=> { this.checkTimeOut(key) }, 60000);
  myVar = myVar1
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
          this.state.frete,this.totalPrice,
           this.state.nome, this.state.telefone, this.state.endereco, this.state.bairro,
           this.state.referencia, this.state.nomeEstabelecimento, "Aguardando Confirmação",(key)=>{
             this.timeoutPedido(key.key)
             // console.log("pedidoKey"+pedidoKey);

             //aguardar confirmação do estabelecimento
             loadMessages(this.state.nomeEstabelecimento, key.key, (message)=>{

               if(message.status=="Confirmado Recebimento"){
                 clearTimeout(myVar)
                 myVar=0
                   //caso pedido seja confirmado
                   Alert.alert(
                    'Pedido Recebido.',
                    'Seu pedido foi recebido pelo estabelecimento e está sendo preparado para o envio até você. Em caso de dúvidas entre em contato com o estabelecimento',
                    [
                      {text: 'OK', onPress: () => {
                        this.setState({
                          esperandoConfirmacao: false
                        });
                        if(semCadastro){

                        }else{
                          salvarPedido(this.state.retirar, this.state.produtosCarrinho, this.totalPrice,
                            this.state.frete, formaPgto, formaPgtoDetalhe,
                            this.state.endereco, this.state.bairro,
                            this.state.nomeEstabelecimento, key.key)
                        }
                        atualizarCarrinho([])
                        const { navigate } = this.props.navigation;
                        navigate('Home')
                      }},
                    ],
                    { cancelable: false }
                  )
               }else if(message.status=="estabFechado"){
                 clearTimeout(myVar)
                 myVar=0
                   Alert.alert(
                     'Estabelecimento Fechado.',
                     'Sinto muito mas o estabelecimento fechou e não está aceitando mais pedidos.',
                     [
                       {text: 'OK', onPress: () => {
                         this.setState({
                           esperandoConfirmacao:false
                         });
                         const { navigate } = this.props.navigation;
                         navigate('Home')
                       }},
                     ],
                     { cancelable: false }
                   )
               }else if(message.status=="semItem"){
                 clearTimeout(myVar)
                 myVar=0
                 loadMessagesSemItem(this.state.nomeEstabelecimento, key.key,(itemIndisponivel)=>{
                   console.log("itemIndisponivel"+JSON.stringify(itemIndisponivel));

                     Alert.alert(
                       'Falta de Disponibilidade de um dos items.',
                       'Devido a falta de disponibilidade do item '+itemIndisponivel.nome.nome+', seu pedido não foi aceito. Sentimos muito pelo incomodo.',
                       [
                         {text: 'OK', onPress: () => {
                           this.setState({
                             esperandoConfirmacao:false
                           });
                           const { navigate } = this.props.navigation;
                           navigate('Carrinho')
                         }},
                       ],
                       { cancelable: false }
                     )

                 })
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

onSelectTipoPgto(tipoPgto){
  this.setState({
    pgtoEscolhido: tipoPgto[0].bandeira
  });
  var optPgto=[]
  tipoPgto.map((item,index)=>{
    optPgto.push(item.bandeira)
  })
  var length = optPgto.length
  optPgto.push('Cancelar')
  ActionSheetIOS.showActionSheetWithOptions({
    options:optPgto,
    cancelButtonIndex:length
  },
    (btnIndex)=>{
      if(btnIndex==length){

      }else{
        this.setState({
          pgtoEscolhido: optPgto[btnIndex]
        });
      }
    }
  )
}

functionPicker(tipoPgto){
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

funcaoCredito(){
    if(Platform.OS=='ios'){
      return(
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity style={{flexDirection: 'column'}} onPress={()=>{this.onSelectTipoPgto(this.state.cre)}}>
            <Text style={{alignSelf: 'center',
              color: cores.corPrincipal,
              textDecorationLine: 'underline',
              fontFamily: 'Futura-Book',
              fontSize: wp('4%')}}>Clique para escolher a bandeira do seu cartão.</Text>
            <Text style={{alignSelf: 'center',
              color: cores.textDetalhes,
              textDecorationLine: 'underline',
              fontFamily: 'Futura-Medium',
              fontSize: wp('4%')}}>{this.state.pgtoEscolhido}</Text>
          </TouchableOpacity>
        </View>
      )
    }else{
    return(
      <View style={{marginLeft: 25}}>
        <Text style={{fontSize: wp('3.75%'),fontFamily: 'Futura-Medium'}}>Selecione a bandeira do seu cartão de crédito:</Text>
        <View>{this.functionPicker()}</View>
      </View>
    )
  }
}

funcaoDebito(){
  if(Platform.OS=='ios'){
    return(
      <View style={{alignSelf: 'center'}}>
        <TouchableOpacity style={{flexDirection: 'column'}} onPress={()=>{this.onSelectTipoPgto(this.state.deb)}}>
          <Text style={{alignSelf: 'center',
            color: cores.corPrincipal,
            textDecorationLine: 'underline',
            fontSize: wp('4%')}}>Clique para escolher a bandeira do seu cartão.</Text>
          <Text style={{alignSelf: 'center',
            color: cores.textDetalhes,
            textDecorationLine: 'underline',
            fontSize: wp('4%')}}>{this.state.pgtoEscolhido}</Text>
        </TouchableOpacity>
      </View>
    )
  }else{
  return(
    <View style={{marginLeft: 25}}>
      <Text style={{fontSize: wp('3.75%'),fontFamily: 'Futura-Medium'}}>Selecione a bandeira do seu cartão de débito:</Text>
      <View>{this.functionPicker(this.state.deb)}</View>
    </View>
  )
}
}

funcaoTroco(){
  return(
    <View style={{marginLeft: 25,flexDirection: 'row',alignItems: 'center',marginVertical: hp('1%')}}>
      <Text style={{fontSize: wp('3.75%'),fontFamily: 'Futura-Medium'}}>Troco para:</Text>
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
                marginLeft: 5,fontFamily: 'Futura-Medium'}}>QTD.</Text>
        </View>

        <View style={{width:wp('54%'),height:35, justifyContent: 'center',
          borderRightColor: cores.corSecundaria,borderRightWidth: 0.5}}>
          <Text style={{
              marginLeft: 5,color:cores.corSecundaria,fontFamily: 'Futura-Medium'}}
              >ITEM</Text>
        </View>

        <View style={{width: wp('24%'),height: 35,
          justifyContent: 'center',alignItems:'center' ,marginRight:10}}>
          <Text style={{color:cores.corSecundaria,
              fontFamily: 'Futura-Medium',alignSelf: 'center'}}>PREÇO</Text>
        </View>
    </View>)
}

updateNome = (text) => {
  this.setState({nome: text})
}
updateTelefone = (text) => {
  var x = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

  text = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  this.setState({telefone: text})
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
            message="Aguarde enquanto o estabelecimento confirma o recebimento do pedido. Pode durar até 1 minuto.." />
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
                    fontFamily: "FuturaBT-MediumItalic",
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

    <Text style={[styles.textAdicionais,{fontFamily:'FuturaBT-MediumItalic' ,fontSize: wp('4.5%'), marginVertical: 5,marginLeft: 5}]}>Selecione a forma de pagamento:</Text>
    <View style={{}}>
      <CheckBox
        textStyle={{marginLeft: 10,fontSize: wp('5%'),fontFamily: 'Futura-Medium',fontWeight: 'normal'}}
        containerStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}}
        title='Cartão de Crédito'
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor={cores.textDetalhes}
        uncheckedColor={cores.textDetalhes}
        checked={this.state.checked}
        onPress={() => {
          this.setState({checked: true,pgtoEscolhido:this.state.cre[0].bandeira})
          this.setState({checked2: false})
          this.setState({checked3: false})
        }}
      />
      <View>
        {this.state.checked && this.funcaoCredito()}
      </View>
      <CheckBox
        textStyle={{marginLeft: 10,fontSize: wp('5%'),fontFamily: 'Futura-Medium',fontWeight: 'normal'}}
        containerStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}}
        title='Cartão de Débito'
        checkedIcon='check-square-o'
        uncheckedIcon='square-o'
        checkedColor={cores.textDetalhes}
        uncheckedColor={cores.textDetalhes}
        checked={this.state.checked2}
        onPress={() => {
          this.setState({checked: false})
          this.setState({checked2: true,pgtoEscolhido:this.state.deb[0].bandeira})
          this.setState({checked3: false})
        }}
      />
      <View>
        {this.state.checked2 && this.funcaoDebito()}
      </View>
      <CheckBox
        textStyle={{marginLeft: 10,fontSize: wp('5%'),fontFamily: 'Futura-Medium',fontWeight: 'normal'}}
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
        referencia={this.state.referencia}
        updateNome={this.updateNome}
        updateTelefone={this.updateTelefone}/>

      </ScrollView>
      <LazyYellowButton
        styleButton={{width: wp('100%')}}
        styleText={{fontFamily:'FuturaPT-Bold',color:cores.corPrincipal, fontSize: wp('5%')}}
        onPress={()=>{
          if(this.state.nome && this.state.telefone){
            this.fazerPedido()
           }else{
             alert('Preencha todos os campos')
           }

        }}
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
