import React, { Component } from 'react';
import { TextInput, Picker, PickerIOS, Platform, ScrollView, Dimensions, Image, Alert, View, Text, Button, ActivityIndicator, FlatList, Icon, TouchableWithoutFeedback } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import {carrinho} from '../addproduto/addproduto'
import {getListaEstabelecimentos, listaEstabelecimentos,
        getUserDetails, getEstabelecimentoInfo,
        loadMessages, sendMessage, chaveMsg} from '../firebase/database'
import ResumoCarrinhoListItem from './resumoCarrinhoListItem'
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
    loading: false,
    nomeEstabelecimento:"",
    logo: "",
    nome: "",
    precoDelivery: "",
    tempoEntrega: "",
    deb: "",
    cre: "",
    din: "",
    pgtoEscolhido:"",
    selectedIndex:0,
    checked:true,
    checked2:false,
    checked3:false,
    frete:6,
    troco:'',
    esperandoConfirmacao:false,
    key:""


  }
  this.updateIndex = this.updateIndex.bind(this)
}

updatePgtoEscolhido = (pgtoEscolhido) => {
   this.setState({ pgtoEscolhido: pgtoEscolhido })
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
  this.estabelecimento= this.props.navigation.state.params.nomeEstabelecimento
  this.setState({
          loading: true
        });
  let user = await firebase.auth().currentUser;

  getUserDetails(user.uid, (nomeP,telefoneP,enderecoP,numeroEndP,bairroP,referenciaP,profilePicURLP)=>{
    this.setState({
      nome: nomeP,
      telefone: telefoneP,
      endereco:enderecoP+", "+numeroEndP,
      numeroEnd:numeroEndP,
      bairro:bairroP,
      referencia:referenciaP,
    });
    this.setState({
            produtosCarrinho: carrinho
          });
  })

  const {state} = this.props.navigation;
  var nomeEstabelecimentoUp = state.params ? state.params.nomeEstabelecimento : ""
  if(nomeEstabelecimentoUp){
    this.setState({nomeEstabelecimento: nomeEstabelecimentoUp}, function(){
      this._callback()
    })
  }

}

_callback(){
  console.log("inside callback");
  getEstabelecimentoInfo(this.state.nomeEstabelecimento, (logoUp, nomeUp, precoDeliveryUp,
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
    })
    this.setState({
        loading: false
      },function(){
        console.log(this.state.din);
      })
  })
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
          formaPgtoDetalhe = this.state.pgtoEscolhido
        }else if(this.state.checked2){
          formaPgto = "Débito"
          formaPgtoDetalhe = this.state.pgtoEscolhido
        }else{
          formaPgto = "Dinheiro"
          formaPgtoDetalhe = this.state.troco
        }
        //mandar informação do pedido para o banco de dados do pedido
        sendMessage(this.state.produtosCarrinho, formaPgto, formaPgtoDetalhe,
           this.state.nome, this.state.telefone, this.state.endereco, this.state.bairro,
           this.state.referencia, estabelecimentoLoad, "aguardando",(key)=>{
             //aguardar confirmação do estabelecimento
             loadMessages(estabelecimentoLoad, key.key, (message)=>{
               if(message.status=="recebido"){
                 this.setState({
                   esperandoConfirmacao: false
                 },function(){
                   //caso pedido seja confirmado
                   Alert.alert(
                    'Pedido Recebido.',
                    'Seu pedido foi recebido pelo estabelecimento e está sendo preparado para o envio até você. Em caso de dúvidas entre em contato com o estabelecimento',
                    [
                      {text: 'OK', onPress: () => {
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

functionPicker(){
  if(Platform.OS==='ios'){
    <PickerIOS
      style={{width:350, height: 40}}
      selectedValue={this.state.pgtoEscolhido}
      onValueChange={(itemValue, itemIndex) => this.setState({pgtoEscolhido: itemValue})}>
      {this.state.cre.map((item, index)=>{
        return (<Picker.Item label={item.bandeira} value={item.bandeira} key={index} />)
      })}
    </PickerIOS>
  }else{
  <Picker
    style={{width:350, height: 40}}
    selectedValue={this.state.pgtoEscolhido}
    onValueChange={(itemValue, itemIndex) => this.setState({pgtoEscolhido: itemValue})}>
    {this.state.cre.map((item, index)=>{
      return (<Picker.Item label={item.bandeira} value={item.bandeira} key={index} />)
    })}
  </Picker>
}
}

funcaoCredito(){
  return(
    <View style={{marginLeft: 25}}>
      <Text style={{fontSize: 15}}>Selecione a bandeira do seu cartão de crédito:</Text>
      <View>{this.functionPicker()}</View>
    </View>
  )
}

funcaoDebito(){
  return(
    <View style={{marginLeft: 25}}>
      <Text style={{fontSize: 15}}>Selecione a bandeira do seu cartão de débito:</Text>
      <View>{this.functionPicker()}</View>
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
            loading={this.state.esperandoConfirmacao} />
    <Text style={[styles.textResumoPgto, {alignSelf: 'center', fontSize: 15}]}>Resumo do Pedido</Text>
    <View style={{height: 100, borderWidth: 1,borderColor: cores.corPrincipal,marginHorizontal: 3}}>
    <FlatList
      ItemSeparatorComponent={this.renderSeparator}
      data= {this.state.produtosCarrinho}
      extraData={this.state}
      renderItem= {
        ({item}) =>
        <ResumoCarrinhoListItem
          item ={item}>
        </ResumoCarrinhoListItem>}
      keyExtractor={item => item._id}
      />
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 5}}>
      <Text style={[styles.textResumoPgto]}>Valor Pedido:</Text>
      <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.totalPrice}</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 5}}>
      <Text style={[styles.textResumoPgto]}>Valor Frete:</Text>
      <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ 6</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 5}}>
      <Text style={[styles.textResumoPgto]}>Valor Total Pedido:</Text>
      <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.totalPrice+this.state.frete}</Text>
    </View>
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

    <View style={{height:2, backgroundColor: cores.corPrincipal}}></View>

      <Text style={[styles.textAdicionais,{fontSize: 16}]}>Informações para Entrega</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.textResumoPgto}>Entregar para: </Text>
        <Text>{this.state.nome}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.textResumoPgto}>Telefone para Contato: </Text>
        <Text>{this.state.telefone}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.textResumoPgto}>Endereço: </Text>
        <Text>{this.state.endereco}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.textResumoPgto}>Bairro: </Text>
        <Text>{this.state.bairro}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.textResumoPgto}>Referência: </Text>
        <Text>{this.state.referencia}</Text>
      </View>
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
      source={require('../../img/alimentos-fundo2.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.separator}></View>
      {content}
    </Image>
);
}
}
