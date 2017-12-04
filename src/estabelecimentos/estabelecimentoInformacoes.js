console.ignoredYellowBox = [
    'Setting a timer'
]

import React, { Component } from 'react';
import { Image, Alert, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles,cores } from '../constants/constants'
import { getEstabelecimentoInfo, estabelecimentoInfo } from '../firebase/database'
import * as firebase from 'firebase';

var formasPgto = []

export class EstabelecimentoInformacoesScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.nomeEstabelecimento,
    headerTitleStyle: { color: cores.corPrincipal, textAlign: 'center', alignSelf:'center', fontSize:24 },
    headerRight: (<View></View>)
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      estabInfo:"",
      nomeEstabelecimento:"",
      logo: "",
      nome: "",
      precoDelivery: "",
      tempoEntrega: "",
      segA: "",
      segF: "",
      terA: "",
      terF: "",
      quaA: "",
      quaF: "",
      quiA: "",
      quiF: "",
      sexA: "",
      sexF: "",
      sabA: "",
      sabF: "",
      domA: "",
      domF: "",
      deb: "",
      cre: "",
      din: ""
    };
  }

  componentWillMount(){
    formasPgto = []
    this.setState({
            loading: true
          });

    const {state} = this.props.navigation;
    var nomeEstabelecimentoUp = state.params ? state.params.nomeEstabelecimento : ""
    console.log("nomeEstabelecimentoUp"+nomeEstabelecimentoUp)
    if(nomeEstabelecimentoUp){
    this.setState({nomeEstabelecimento: nomeEstabelecimentoUp}, function(){
      this._callback()

    })
    }

  }

  _callback(){
    if(this.state.estabInfo){
      console.log("setState:"+this.state.estabInfo)
    }
    return this.state.estabInfo+""
  }


  getFormasPgto(){
    if(this.state.din == "s"){
      formasPgto.push("Dinheiro")
    }

    if(this.state.cre){
      
    }

    if(this.state.deb){

    }
  }

  componentDidMount(){

    getEstabelecimentoInfo(this.state.nomeEstabelecimento, (logoUp, nomeUp, precoDeliveryUp,
      tempoEntregaUp, segAUp, segFUp, terAUp, terFUp, quaAUp, quaFUp, quiAUp, quiFUp, sexAUp,
      sexFUp, sabAUp, sabFUp, domAUp, domFUp, creUp, debUp, dinUp)=>{
      this.setState({
          logo: logoUp,
          nome: nomeUp,
          precoDelivery: precoDeliveryUp,
          tempoEntrega: tempoEntregaUp,
          segA: segAUp,
          segF: segFUp,
          terA: terAUp,
          terF: terFUp,
          quaA: quaAUp,
          quaF: quaFUp,
          quiA: quiAUp,
          quiF: quiFUp,
          sexA: sexAUp,
          sexF: sexFUp,
          sabA: sabAUp,
          sabF: sabFUp,
          domA: domAUp,
          domF: domFUp,
          cre: creUp,
          deb: debUp,
          din: dinUp
      })
      this.setState({
            loading: false
          });
    })

    console.log("CREDITO"+this.state.cre)

  }


   render() {

     let imageProfile = {
       uri: this.state.logo ? this.state.logo : 'require(../../img/makefg.png)'
     }

     const content = this.state.loading ?

     <View style={styles.containerIndicator}>
       <ActivityIndicator
         color = '#8b0000'
         size="large"
         style = {styles.activityIndicator}/>
     </View> :

     <View style={{flex:1}}>
       <View style={styles.separator}></View>
       <Image
         style={styles.imagemEstabInfo}
         source={{uri:imageProfile.uri}}/>

       <View style={styles.separator}></View>

       <Text style={styles.textInformacoesD}>Taxa Delivery: {this.state.precoDelivery} </Text>
       <Text style={styles.textInformacoesD}>Tempo Estimado de Entrega: {this.state.tempoEntrega} </Text>

       <View style={styles.separator}></View>

       <Text style={styles.textInformacoes}>Horários de Funcionamento</Text>
       <Text style={styles.textInformacoesD}>Segunda-Feira: {this.state.segA} às {this.state.segF}</Text>
       <Text style={styles.textInformacoesD}>Terça-Feira: {this.state.terA} às {this.state.terF}</Text>
       <Text style={styles.textInformacoesD}>Quarta-Feira: {this.state.quaA} às {this.state.quaF}</Text>
       <Text style={styles.textInformacoesD}>Quinta-Feira: {this.state.quiA} às {this.state.quiF}</Text>
       <Text style={styles.textInformacoesD}>Sexta-Feira: {this.state.sexA} às {this.state.sexF}</Text>
       <Text style={styles.textInformacoesD}>Sábado: {this.state.sabA} às {this.state.sabF}</Text>
       <Text style={styles.textInformacoesD}>Domingo: {this.state.domA} às {this.state.domF}</Text>

       <View style={styles.separator}></View>

       <Text style={styles.textInformacoes}>Formas de Pagamento</Text>
       <Text style={styles.textInformacoesD}>Crédito: {}</Text>
       <Text style={styles.textInformacoesD}>Débito: {}</Text>
       <Text style={styles.textInformacoesD}>Dinheiro: {}</Text>

       <View style={styles.separator}></View>

     </View>

     return (
       <Image
         source={require('../../img/alimentos-fundo2.jpg')}
         style={styles.backgroundImage}>
         {content}
       </Image>
     );
     }
}
