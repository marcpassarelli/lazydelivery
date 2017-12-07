console.ignoredYellowBox = [
    'Setting a timer'
]

import React, { Component } from 'react';
import { Image, Alert, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import { styles,cores } from '../constants/constants'
import { getEstabelecimentoInfo, estabelecimentoInfo } from '../firebase/database'
import * as firebase from 'firebase';

export class EstabelecimentoInformacoesScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.nomeEstabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>),
    tabBarLabel: 'Informações',
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
      seg: "",
      ter: "",
      qua: "",
      qui: "",
      sex: "",
      sab: "",
      dom: "",
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

  componentDidMount(){

    getEstabelecimentoInfo(this.state.nomeEstabelecimento, (logoUp, nomeUp, precoDeliveryUp,
      tempoEntregaUp, segUp, terUp, quaUp, quiUp, sexUp, sabUp, domUp, creUp, debUp, dinUp)=>{
      this.setState({
          logo: logoUp,
          nome: nomeUp,
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

     <ScrollView style={{flex:1}}>
       <View style={styles.separator}></View>
       <Image
         style={styles.imagemEstabInfo}
         source={{uri:imageProfile.uri}}/>

       <View style={styles.separator}></View>

       <Text style={styles.textInformacoes}>Taxa Delivery: {this.state.precoDelivery} </Text>
       <Text style={styles.textInformacoes}>Tempo Estimado de Entrega: {this.state.tempoEntrega} </Text>

       <View style={styles.separator}></View>

       <Text style={styles.textInformacoes}>Horários de Funcionamento</Text>
       <Text style={styles.textInformacoesD}>Segunda-Feira: {this.state.seg}</Text>
       <Text style={styles.textInformacoesD}>Terça-Feira: {this.state.ter}</Text>
       <Text style={styles.textInformacoesD}>Quarta-Feira: {this.state.qua}</Text>
       <Text style={styles.textInformacoesD}>Quinta-Feira: {this.state.qui}</Text>
       <Text style={styles.textInformacoesD}>Sexta-Feira: {this.state.sex}</Text>
       <Text style={styles.textInformacoesD}>Sábado: {this.state.sab}</Text>
       <Text style={styles.textInformacoesD}>Domingo: {this.state.dom}</Text>

       <View style={styles.separator}></View>

       <Text style={styles.textInformacoes}>Formas de Pagamento</Text>
       <Text style={styles.textInformacoes2}>Crédito:</Text>
       <Text style={styles.textInformacoesD}>{this.state.cre}</Text>
       <Text style={styles.textInformacoes2}>Débito:</Text>
       <Text style={styles.textInformacoesD}>{this.state.deb}</Text>
       <Text style={styles.textInformacoes2}>{this.state.din}</Text>

       <View style={styles.separator}></View>

     </ScrollView>

     return (
       <Image
         source={require('../../img/alimentos-fundo2.jpg')}
         style={styles.backgroundImage}>
         {content}
       </Image>
     );
     }
}
