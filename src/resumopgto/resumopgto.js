import React, { Component } from 'react';
import { ScrollView, Dimensions, Image, Alert, View, Text, Button, ActivityIndicator, FlatList, Icon, TouchableWithoutFeedback } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import {carrinho} from '../addproduto/addproduto'
import {getListaEstabelecimentos, listaEstabelecimentos, getUserDetails, getEstabelecimentoInfo} from '../firebase/database'
import ResumoCarrinhoListItem from './resumoCarrinhoListItem'
import FormasPgtoListItem from './formasPgtoListItem'
import { CheckBox } from 'react-native-elements'

import _ from 'lodash'

let totalPrice =0

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
    seg: "",
    ter: "",
    qua: "",
    qui: "",
    sex: "",
    sab: "",
    dom: "",
    deb: "",
    cre: "",
    din: "",
    tiposPgto:"",
    selectedIndex:0,
    checked:true,
    checked2:false,
    checked3:false,
    frete:6


  }
  this.updateIndex = this.updateIndex.bind(this)
}

updateIndex (selectedIndex) {
  this.setState({selectedIndex})
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


async componentWillMount(){

  this.setState({
          loading: true
        });
  let user = await firebase.auth().currentUser;

  getUserDetails(user.uid, (nomeP,telefoneP,enderecoP,numeroEndP,bairroP,referenciaP,profilePicURLP)=>{
    this.setState({
      nome: nomeP,
      telefone: telefoneP,
      endereco:enderecoP,
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
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 15}}>
      <Text style={[styles.textResumoPgto]}>Valor Pedido:</Text>
      <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.totalPrice}</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 15}}>
      <Text style={[styles.textResumoPgto]}>Valor Frete:</Text>
      <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ 6</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 15}}>
      <Text style={[styles.textResumoPgto]}>Valor Total Pedido:</Text>
      <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.totalPrice+this.state.frete}</Text>
    </View>
    <ScrollView>
    <View style={{height:2, backgroundColor: cores.corPrincipal}}></View>
    <Text style={[styles.textAdicionais,{fontSize: 16, marginBottom: 0,marginLeft: 5}]}>Selecione a forma de pagamento:</Text>
    <View style={{}}>
      <CheckBox
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
        <Text style={{fontSize: 12, marginLeft: 15}}>Bandeiras aceitas: {this.state.cre.map((item, i, arr)=>{
            if(arr.length===i+1){
              return(<Text key={i}>{item.bandeira}</Text>)
            }else{
              return(<Text key={i}>{item.bandeira}, </Text>)
            }
          })
        }</Text>
      </View>
      <CheckBox
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
        <Text style={{fontSize: 12, marginLeft: 15}}>Bandeiras aceitas: {this.state.deb.map((item, i, arr)=>{
            if(arr.length===i+1){
              return(<Text key={i}>{item.bandeira}</Text>)
            }else{
              return(<Text key={i}>{item.bandeira}, </Text>)
            }
          })
        }</Text>
      </View>
      <CheckBox
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
        <Text>{this.state.endereco}, {this.state.numeroEnd}</Text>
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
