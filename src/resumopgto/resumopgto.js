import React, { Component } from 'react';
import { TextInput, Picker, PickerIOS, Platform, ScrollView, Dimensions, Image, Alert, View, Text, Button, ActivityIndicator, FlatList, Icon } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import * as firebase from 'firebase';
import {carrinho, atualizarCarrinho} from '../addproduto/addproduto'
import { getUserProfile, getUserEndAtual, getEstabelecimentoInfo,
  loadMessages, sendMessage, salvarPedido} from '../firebase/database'
import ResumoCarrinhoListItem from './resumoCarrinhoListItem'
import ResumoInformacoes from './resumoInformacoes'
import Loader from '../loadingModal/loadingModal';

import { CheckBox } from 'react-native-elements'
import _ from 'lodash'

let totalPrice =0
let teste=[];
let estabelecimento=""
const produtosCarrinho = []

export class ResumoPgtoScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: "Resumo Pedido - "+navigation.state.params.nomeEstabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>)
  })

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
    frete:6,
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

renderSeparator = () => {
 return (
   <View
     style={{
       height: 1,
       width: "100%",
       backgroundColor: "#CED0CE",
       marginLeft: 5,
       marginBottom: 7
     }}
   />
 );
};

componentDidMount(){



}

async componentWillMount(){
  let userId = await firebase.auth().currentUser.uid
  console.log("userID"+userId);

  this.estabelecimento= this.props.navigation.state.params.nomeEstabelecimento
  console.log("this.retirar"+this.props.navigation.state.params.retirarLoja);
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
  let user = await firebase.auth().currentUser;
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
      console.log("state.cre"+this.state.cre);
    })
  })
  //Pegar informações usuário
  getUserProfile(user.uid, (nomeP,telefoneP,profilePicURLP)=>{
    console.log("nomePPPP"+nomeP);
    this.setState({
      nome: nomeP,
      telefone: telefoneP,
    },function(){
      console.log("state.nome"+this.state.nome);
    });
  })
  //Pegar endereço cadastrado
  getUserEndAtual((enderecoP,numeroEndP,bairroP,referenciaP)=>{
    console.log("dentrogetUserEndAtul");
      this.setState({
        endereco:enderecoP+", "+numeroEndP,
        bairro:bairroP,
        referencia:referenciaP
      },function(){
        this._callback()
      });
    })



}

_callback(){
  console.log("inside callback"+this.state.nomeEstabelecimento);
  this.setState({
    loading:false
  });

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
        //mandar informação do pedido para o banco de dados do pedido
        sendMessage(this.state.retirar, this.state.produtosCarrinho, formaPgto, formaPgtoDetalhe,
           this.state.nome, this.state.telefone, this.state.endereco, this.state.bairro,
           this.state.referencia, this.state.nomeEstabelecimento, "Aguardando Confirmação",(key)=>{
             //aguardar confirmação do estabelecimento
             loadMessages(this.state.nomeEstabelecimento, key.key, (message)=>{

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
                        console.log("totalPrice"+this.totalPrice);
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
      itemStyle={{color: cores.corPrincipal,height:80, fontSize: 20,right: 10}}
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
  <Picker
    style={{width:350, height: 40}}
    selectedValue={this.state.pgtoEscolhido}
    onValueChange={this.updatePgtoEscolhido}>
    {tipoPgto.map((item, index)=>{
      return (<Picker.Item label={item.bandeira} value={item.bandeira} key={index} />)
    })}
  </Picker>)
}
}

funcaoCredito(){
  return(
    <View style={{marginLeft: 25}}>
      <Text style={{fontSize: 15}}>Selecione a bandeira do seu cartão de crédito:</Text>
      <View>{this.functionPicker(this.state.cre)}</View>
    </View>
  )
}

funcaoDebito(){
  return(
    <View style={{marginLeft: 25}}>
      <Text style={{fontSize: 15}}>Selecione a bandeira do seu cartão de débito:</Text>
      <View>{this.functionPicker(this.state.deb)}</View>
    </View>
  )
}

funcaoTroco(){
  return(
    <View style={{marginLeft: 25,flexDirection: 'row',alignItems: 'center'}}>
      <Text style={{fontSize: 15}}>Troco para:</Text>
      <TextInput
        style={[styles.textInputs,{width: 250, fontSize: 15}]}
        onChangeText = {this.updateTroco}
        labelStyle={{ color: '#8b0000' }}
        borderColor={'#8b0000'}
        returnKeyType="next"
        keyboardType='numeric'
        maxLength={6}
       />
    </View>
  )
}

valorVirgula(valor){
  var str = (valor).toFixed(2)
  var res = str.toString().replace(".",",")
  return(
      <Text style={styles.textResumoPgto}>{res}</Text>
  )
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
    <ActivityIndicator
      color = '#8b0000'
      size="large"
      style = {styles.activityIndicator}/>
  </View> :

  <View style={{flex:1}}>
    <Loader
            loading={this.state.esperandoConfirmacao}
            message="Aguarde enquanto o estabelecimento confirma o recebimento do pedido..." />
    <Text style={[styles.textResumoPgto, {alignSelf: 'center', fontSize: 15}]}>Resumo do Pedido</Text>
    <View style={{height: 100, borderWidth: 1,borderColor: cores.corPrincipal,marginHorizontal: 3}}>

      {/* Resumo Carrinho */}
    <FlatList
      ItemSeparatorComponent={this.renderSeparator}
      data= {this.state.produtosCarrinho}
      extraData={this.state}
      renderItem= {
        ({item}) =>
        <ResumoCarrinhoListItem
          item ={item}
          preco={() => {
            var str = (item.preco*item.quantidade).toFixed(2)
            var res = str.toString().replace(".",",")
            return(
                <Text style={[styles.textCarrinho, {fontSize: 13, alignSelf: 'flex-end', marginRight: 15}]}>R$ {res}</Text>
            )
          }}>
        </ResumoCarrinhoListItem>}
      keyExtractor={item => item._id}
      />
    </View>
    {this.state.retirar ?
      <View></View>
    :
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 5}}>
          <Text style={[styles.textResumoPgto]}>Valor Pedido:</Text>
          <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.valorVirgula(this.totalPrice)}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 5}}>
          <Text style={[styles.textResumoPgto]}>Valor Frete:</Text>
          <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.valorVirgula(this.state.frete)}</Text>
        </View>
      </View>
    }
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 5}}>
      <Text style={[styles.textResumoPgto]}>Valor Total Pedido:</Text>
      <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.valorVirgula(this.totalPrice+this.state.frete)}</Text>
    </View>

      {/* Resumo Formas Pgto */}
    <ScrollView>
    <View style={{height:2, backgroundColor: cores.corPrincipal}}></View>

    <Text style={[styles.textAdicionais,{fontSize: 16, marginBottom: 0,marginLeft: 5}]}>Selecione a forma de pagamento:</Text>
    <View style={{}}>
      <CheckBox
        textStyle={{fontSize: 16}}
        containerStyle={{backgroundColor: 'rgba(0,0,0,0.1)'}}
        title='Cartão de Crédito'
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
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
        textStyle={{fontSize: 16}}
        containerStyle={{backgroundColor: 'rgba(0,0,0,0.1)'}}
        title='Cartão de Débito'
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
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
        textStyle={{fontSize: 16}}
        containerStyle={{backgroundColor: 'rgba(0,0,0,0.1)'}}
        title='Dinheiro'
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
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
    <View style={{height:2, backgroundColor: cores.corPrincipal}}></View>

      <ResumoInformacoes
        retirar={this.state.retirar}
        nome={this.state.nome}
        telefone={this.state.telefone}
        endereco={this.state.endereco}
        bairro={this.state.bairro}
        referencia={this.state.referencia}/>

      </ScrollView>

      <Button
        onPress={()=>{this.fazerPedido()}}
        title="Fazer Pedido"
        color={cores.corPrincipal}
        accessibilityLabel="YourLabelHere"
      />
  </View>

  return (

    <Image
      source={images.imageBackground}
      style={styles.backgroundImage}>
      <View style={styles.separator}></View>
      {content}
    </Image>
);
}
}
